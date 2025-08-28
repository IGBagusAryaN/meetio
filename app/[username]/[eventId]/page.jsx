import { getEventAvailability, getEventDetails } from "@/app/actions/events";
import EventDetails from "./_components/event-details";
import { Suspense } from "react";
import BookingForm from "./_components/booking-form";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Your App Name`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);

  // console.log(availability)

  if (!event) {
    notFound();
  }

  return (
    <div className="grid grid-cols-[2fr_3fr] w-full max-w-[1100px] mx-auto pb-8 pt-28 gap-5">
     
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  );
}