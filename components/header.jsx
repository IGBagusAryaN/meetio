import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export const Header = async () => {
  await checkUser();
  return (
    <div className="fixed w-full bg-white z-40 border">
      <nav className="mx-auto py-5 px-6 flex justify-between items-center max-w-6xl">
        <Link href={"/"} className="flex items-center -mt-2">
          <Image src="/logoo.png" alt="Illustration" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-4">
          <Link href={"/events?create=true"}>
            <Button className="bg-[#1E1E2E] !important">
              <PenBox /> Create Event
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};
