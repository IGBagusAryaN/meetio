import React from "react";
import AvailabilityForm from "./_components/availability-form";
import { defaultAvailability } from "./data";
import { getUserAvailability } from "@/app/actions/availability";
import TimeLottie from "@/components/lottie/time";

const AvailabilityPage = async () => {
  const availability = await getUserAvailability();
  console.log(availability);
  return (
    <div className="max-w-[1100px] mx-auto mt-10 px-7 lg:px-0 mb-20 lg:mb-0">
      <h1 className="text-3xl font-bold">Your Availability </h1>
      <div className="grid lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <AvailabilityForm initialData={availability || defaultAvailability} />
        </div>
        <div className="order-1 lg:order-2">
          <TimeLottie />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;
