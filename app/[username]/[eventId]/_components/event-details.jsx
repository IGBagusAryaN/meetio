import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquareQuote } from "lucide-react";
import React from "react";

const EventDetails = ({ event }) => {
  const { user } = event;
  return (
    <div className="py-10 lg:w-full">
      <h1 className="text-3xl font-bold mb-4 flex items-center">📌{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="flex items-center mb-2 text-gray-600">
        <Clock className="mr-2"/>
        <span>{event.duration} minute</span>
      </div>
      <div className="flex items-center mb-4 border-b pb-5 text-gray-600">
        <Calendar className="mr-2"/>
        <span>Google Meet</span>
      </div>
      <p className="text-gray-700 ">{event.description}</p>
    </div>
  );
};

export default EventDetails;
