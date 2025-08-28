"use client";

import { usernameSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/app/hooks/use-fetch";
import { updateUsername } from "@/app/actions/users";
import { BarLoader } from "react-spinners";
import AgendaLottie from "@/components/lottie/agenda";

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);

  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
 fnUpdateUsername({ username: data.username }); 
  };
  return (
    <div className="grid grid-cols-2 max-w-6xl mx-auto space-y-7 mt-10 px-6">
    <AgendaLottie/>
    <div className=" w-full">
      <Card  className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
        {/* Latest Updates */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>{window?.location.origin}</span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
            {loading && <BarLoader width={"100%"} color="#36d7b7" />}
            <Button type="submit" className="bg-[#E19B2C] !important">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default Dashboard;
