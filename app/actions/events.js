"use server";

import { auth } from "@clerk/nextjs/server";
import { eventSchema } from "../lib/validators";
import { db } from "@/lib/prisma";
// import { addDays, addMinutes, format, startOfDay } from "date-fns";
import { 
  startOfDay, 
  addDays, 
  format, 
  isBefore, 
  addMinutes, 
  parse,
} from "date-fns";


export async function createEvents(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validateData = eventSchema.parse(data);

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await db.event.create({
    data: {
      ...validateData,
      userId: user.id,
    },
  });

  return event;
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const events = await db.event.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return { events, username: user.username };
}

export async function deleteEvents(eventId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.userId !== user.id) {
    throw new Error("Event not found or unauthorized");
  }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
}

export async function getEventDetails(username, eventId) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  return event;
}

export async function getEventAvailability(eventId) {
  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!event || !event.user.availability) {
    return [];
  }

  const { availability, bookings } = event.user;
  availability.forEach((a, idx) => {
  // console.log("Availability index:", idx);
  // console.log("TimeGap:", a.timeGap);
  // console.log("Days:", a.days);
});
  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30); 

  const availableDates = [];

 for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
  const dayOfWeek = format(date, "EEEE").toUpperCase();

  // Ambil dari availability pertama
  const dayAvailability = availability[0]?.days?.find(
    (d) => d.day === dayOfWeek
  );

  if (dayAvailability) {
    const dateStr = format(date, "yyyy-MM-dd");

    const slots = generateAvailableTimeSlots(
      dayAvailability.startTime,
      dayAvailability.endTime,
      event.duration,
      bookings,
      dateStr,
      availability[0].timeGap
    );

    const entry = {
      date: dateStr,
      slots,
    };

    // console.log("PUSHED:", entry); // ✅ cek hasil tiap hari
    availableDates.push(entry);
  }
}


  return availableDates;
}


function generateAvailableTimeSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap = 0
) {
  const slots = [];

  // Ambil jam & menit dari Date lokal, bukan UTC
  const startStr = format(startTime, "HH:mm");
  const endStr = format(endTime, "HH:mm");

  let currentTime = parse(`${dateStr} ${startStr}`, "yyyy-MM-dd HH:mm", new Date());
  const slotEndTime = parse(`${dateStr} ${endStr}`, "yyyy-MM-dd HH:mm", new Date());

  const now = new Date();
  if (format(now, "yyyy-MM-dd") === dateStr) {
    currentTime = isBefore(currentTime, now)
      ? addMinutes(now, timeGap)
      : currentTime;
  }

  while (currentTime < slotEndTime) {
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);

    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }

    currentTime = slotEnd;
  }

  return slots;
}
