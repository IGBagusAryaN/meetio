"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar1,
  CircleCheck,
  LayoutDashboard,
  NotebookTabs,
  PenBox,
  RotateCcwSquare,
  Users,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
  { href: "/events", label: "Events", icon: <Calendar1 /> },
  { href: "/meetings", label: "Meetings", icon: <Users /> },
  { href: "/availability", label: "Availability", icon: <RotateCcwSquare /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-16 bg-[#1E1E2E] flex flex-col items-center justify-between py-4 z-50">
        <div
          className={`flex flex-col justify-between items-center gap-1 transition-transform duration-300 -mt-2 ${
            isOpen ? "scale-95 opacity-0 pointer-events-none" : "scale-100"
          }`}
        >
          <Image src="/mini-logo.png" alt="minilogo" width={700} height={700} />
        </div>

        {pathname !== "/" && (
          <button
            onClick={toggleSidebar}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors duration-300 outline-none ${
              isOpen ? "text-[#E19B2C]" : "text-white"
            }`}
          >
            <div className="-rotate-90 whitespace-nowrap flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Menu
            </div>
          </button>
        )}

        <div></div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-16 h-screen w-64 bg-white shadow-lg z-40 p-6 flex flex-col"
          >
            <Image
              src="/logoo.png"
              alt="Illustration"
              width={100}
              height={100}
            />

            <ul className="space-y-4 text-lg mt-20 flex-1">
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
                    className={`flex items-center gap-5 hover:text-[#E19B2C] ${
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

            {/* <div>
              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard">
                  <div className="w-full">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </div>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserMenu />
              </SignedIn>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
