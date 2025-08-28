import { Header } from "@/components/header";
import MeetioLottie from "@/components/lottie/meet";
import Sidebar from "@/components/side-bar";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily Set Up and customize your event types",
  },
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily Set Up and customize your event types",
  },
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily Set Up and customize your event types",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Clients pick a time that works — no back and forth needed",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-white min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold text-[#1E1E2E] mb-6 leading-tight">
              Simplify Your Scheduling
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Meetio helps you manage your time effectively. Create events, set
              your availability, and let others book time with you seamlessly.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-[#E19B2C] text-white rounded-md hover:bg-[#785318] transition"
            >
              Get Started <span className="ml-2">→</span>
            </a>
          </div>

          <div className="flex justify-center">
            <MeetioLottie />
          </div>
        </div>
      </section>
      {/* <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          What Our Users Say
        </h2>
        <Testimonials />
      </div> */}
      {/* <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index)=> (
              <div className="text-center" key={index}>
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                  <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
                  <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
      </div> */}
    </div>
  );
}
