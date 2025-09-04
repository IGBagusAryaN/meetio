"use server";

import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";

export async function createBooking(bookingData) {
  try {
    // 1. Ambil event + user dari DB
    const event = await db.event.findUnique({
      where: { id: bookingData.eventId },
      include: { user: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // 2. Ambil Google OAuth token user (host)
    const { data } = await clerkClient.users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google"
    );

    const token = data[0]?.token;
    if (!token) {
      throw new Error("Event creator has not connected Google Calendar");
    }

    // 3. Setup OAuth client Google
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // 4. Siapin attendees
    const attendees = (bookingData.emails || []).map((email, i) => ({
      email,
      displayName: bookingData.names?.[i] || undefined,
    }));

    // Tambahin host (event creator)
    attendees.push({ email: event.user.email });

    // 5. Buat event di Google Calendar
    const meetResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
   summary: `${event.user.name || event.user.email} - ${event.title}`,

        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees,
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    // 6. Simpan ke DB
    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        // simpan semua nama & email sebagai JSON
        name: JSON.stringify(bookingData.names || []),
        email: JSON.stringify(bookingData.emails || []),
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return { success: true, booking, meetLink };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
