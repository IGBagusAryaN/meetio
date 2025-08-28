"use client";

import Sidebar from "@/components/side-bar";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";

const AppLayout = ({ children }) => {
  const { isLoaded } = useUser();

  return (
    <div className="">
      <div className="pt-20">
        {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}
      </div>
      <Sidebar />
      {children}
    </div>
  );
};

export default AppLayout;
