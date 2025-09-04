import { getUserEvents } from "@/app/actions/events";
import EventCard from "@/components/event-card";
import LoadingLottie from "@/components/lottie/loading";
import React, { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center pt-48">
          <LoadingLottie />
        </div>
      }
    >
      <Events />
    </Suspense>
  );
}

const Events = async () => {
  const { events, username } = await getUserEvents();

  if (events.length === 0) {
    return (
      <div className="max-w-[1100px]  mt-10 mx-auto px-7 lg:px-0">
        <h1 className="text-3xl font-bold">Event list</h1>
        <p className="mt-10">
          You haven&apos;t created any events yet
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px]  mt-10 mx-auto px-7 lg:px-0">
      <h1 className="text-3xl font-bold">Event list</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3  mt-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} username={username} />
        ))}
      </div>
    </div>
  );
};
