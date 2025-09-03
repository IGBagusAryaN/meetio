"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar1,
  LayoutDashboard,
  RotateCcwSquare,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
  { href: "/events", label: "Events", icon: <Calendar1 /> },
  { href: "/meetings", label: "Meetings", icon: <Users /> },
  { href: "/availability", label: "Availability", icon: <RotateCcwSquare /> },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="fixed w-full bg-white z-40 border">
      <nav className="mx-auto py-5 px-6 flex justify-between items-center max-w-6xl">
        {/* Logo */}
        <Link href={"/"} className="flex items-center -mt-2">
          <Image src="/logoo.png" alt="Illustration" width={100} height={100} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href={"/events?create=true"}>
            <Button className="bg-[#1E1E2E]">
              <PenBox className="mr-2 h-4 w-4" /> Create Event
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Dropdown with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t shadow-lg px-6 py-4 flex flex-col gap-3"
          >
                    {pathname !== "/" && (
            <ul className="space-y-4 text-lg flex-1 mb-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  {/* <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-5 hover:text-[#E19B2C] ${
                                  pathname === item.href
                                    ? "text-[#E19B2C] font-semibold"
                                    : "text-[#1E1E2E]"
                                }`}
                              >
                                {item.icon} {item.label}
                              </Link> */}

                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 py-1 px-2 rounded-md hover:text-[#E19B2C] hover:bg-gray-100 ${
                      pathname === item.href
                        ? "text-[#E19B2C] font-semibold"
                        : "text-[#1E1E2E]"
                    }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
                    )}

            <Link href={"/events?create=true"} onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-[#1E1E2E] mb-5">
                <PenBox className="mr-2 h-4 w-4" /> Create Event
              </Button>
            </Link>
            <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserMenu />
            </SignedIn>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
