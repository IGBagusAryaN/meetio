"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";
import React from "react";

const UserMenu = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-2">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="My Events"
            labelIcon={<ChartNoAxesGantt size={15} />}
            href="/events"
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
      {user && (
        <span className="text-sm text-gray-700 dark:text-gray-200 block md:hidden">
          {user.primaryEmailAddress?.emailAddress}
        </span>
      )}
    </div>
  );
};

export default UserMenu;
