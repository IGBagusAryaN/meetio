"use client"
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  return <SignIn redirectUrl={redirectUrl} />;
};


