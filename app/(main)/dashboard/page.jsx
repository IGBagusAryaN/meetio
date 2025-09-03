"use client";

import { usernameSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/app/hooks/use-fetch";
import { updateUsername } from "@/app/actions/users";
import { BarLoader } from "react-spinners";
import AgendaLottie from "@/components/lottie/agenda";

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const [origin, setOrigin] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    // Set origin hanya di client
    setOrigin(window.location.origin);

    // Set username jika sudah loaded
    if (isLoaded && user?.username) {
      setValue("username", user.username);
    }
  }, [isLoaded, user?.username, setValue]);

    const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername, {
    successMessage: "Username berhasil diupdate!",
    errorMessage: "Gagal update username",
  });

  const onSubmit = async (data) => {
    await fnUpdateUsername({ username: data.username });
  };


  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="order-1 lg:order-1 flex justify-center">
        <AgendaLottie />
      </div>
      <div className="order-2 lg:order-2 w-full -mt-48  mb-20 lg:mb-0">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">
              Welcome, {user?.firstName}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Unique Link</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                  <span className="text-sm lg:text-base break-all">{origin}</span>
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
              <Button type="submit" className="bg-[#E19B2C]">
                Update Username
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
