import { notFound } from "next/navigation";
import { getUserByUsername } from "../actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventCard from "@/components/event-card";

export async function generateMetadata({params}) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name}'s Profile | Meet'io`,
    description: `Book an event with ${user.name}. View available public events and schedules.`,
  };
}

const UserPage = async ({ params }) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }
  console.log(user);
  return (
    <div className="max-w-[1100px] mx-auto pt-36">
      <div className="flex gap-5 mb-5">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="">
        <h1>{user.name}</h1>
        <p className="text-gray-600">
          Welcome to my scheduling page. Please select an event below to book a
          call with me
        </p>
        </div>
      </div>

      {user.events.length === 0 ? (
        <p>No public events available.</p>
      ) : (
        <div>
          {user.events.map((event) => {
            return (
              <EventCard
                key={event.id}
                event={event}
                username={params.username}
                isPublic
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserPage;
