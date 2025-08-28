import LoadingLottie from "@/components/lottie/loading";
import { Suspense } from "react";

export default function AvailabilityLayout({ children }) {
  return (
    <Suspense fallback={<div className="w-full flex justify-center pt-48"><LoadingLottie/></div>}>{children}</Suspense>
  );
}
