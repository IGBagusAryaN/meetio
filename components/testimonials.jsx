"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "Schedulr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Lee",
    role: "Freelance Designer",
    content:
      "As a freelancer, Schedulr helps me stay organized and professional. My clients love how easy it is to book time with me.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Emily Chen",
    role: "Product Manager",
    content:
      "Using Schedulr has improved our team productivity significantly. We’re able to collaborate better and track meetings easily.",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Michael Thompson",
    role: "Software Engineer",
    content:
      "Schedulr simplifies scheduling across time zones. It's an essential tool for remote teams like ours.",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Aisha Rahman",
    role: "HR Specialist",
    content:
      "It’s so easy to coordinate interviews and internal meetings now. Schedulr has become a daily tool I rely on.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Carlos Martinez",
    role: "Operations Lead",
    content:
      "Our operations flow much smoother with Schedulr. It cuts down on back-and-forth emails and saves us a ton of time.",
    image: "https://i.pravatar.cc/150?img=6",
  },
];



const Testimonials = () => {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full mx-auto"
      >
        <CarouselContent className="-ml-1">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full">
                  <CardContent className="flex flex-col justify-center h-full p-6">
                    <p className="text-gray-600 mb-4">
                      &quot; {testimonial.content}&quot;
                    </p>
                    <Avatar>
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Testimonials;
