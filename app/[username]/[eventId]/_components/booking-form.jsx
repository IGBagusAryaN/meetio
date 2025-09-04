"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/app/hooks/use-fetch";
import { createBooking } from "@/app/actions/booking";
import BookingSuccess from "@/components/lottie/booking-success";
import { format, parseISO, isValid } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
export default function BookingForm({ event, availability }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [savedBooking, setSavedBooking] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: [{ name: "", email: "" }], // minimal 1 peserta
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots =
    selectedDate
      ? availability.find((day) => {
          let dateObj;
          if (selectedDate instanceof Date) dateObj = selectedDate;
          else if (typeof selectedDate === "string") dateObj = parseISO(selectedDate);
          else return false;
          if (!isValid(dateObj)) return false;
          return day.date === format(dateObj, "yyyy-MM-dd");
        })?.slots || []
      : [];

  useEffect(() => {
    if (selectedDate) setValue("date", format(selectedDate, "yyyy-MM-dd"));
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) setValue("time", selectedTime);
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking, {
    successMessage: "Booking berhasil dibuat!",
    errorMessage: "Gagal membuat booking",
  });

  // 🔹 Simpan ke localStorage kalau booking berhasil
  useEffect(() => {
    if (data?.booking) {
      localStorage.setItem("lastBooking", JSON.stringify(data.booking));
      setSavedBooking(data.booking);
    }
  }, [data]);

  // 🔹 Ambil dari localStorage pas pertama kali load
  useEffect(() => {
    const stored = localStorage.getItem("lastBooking");
    if (stored) {
      setSavedBooking(JSON.parse(stored));
    }
  }, []);

  const onSubmit = async (formData) => {
    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const startTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      names: formData.participants.map((p) => p.name),
      emails: formData.participants.map((p) => p.email),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: formData.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  // 🔹 Kalau ada booking tersimpan, tampilkan success page
  if (savedBooking) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 border bg-white">
        <BookingSuccess />
        <h2>Booking Successful!</h2>
        {savedBooking.meetLink && (
          <p>
            Join the meeting:{" "}
            <a
              href={savedBooking.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {savedBooking.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-10 border">
      <div className="lg:h-96 flex flex-col lg:flex-row gap-5 ">
        {/* Calendar */}
        <div className="w-full">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: { background: "#E19B2C", borderRadius: 100, color: "white" },
            }}
          />
        </div>

        {/* Time Slots */}
        <div className="w-full h-full">
          {selectedDate && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button key={slot} onClick={() => setSelectedTime(slot)} variant={selectedTime === slot ? "default" : "outline"}>
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Participants Form */}
      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="font-semibold">Participants</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input {...register(`participants.${index}.name`)} placeholder="Name" />
              <Input {...register(`participants.${index}.email`)} placeholder="Email" />
              {fields.length > 1 && (
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ name: "", email: "" })}>
            + Add Participant
          </Button>

          <div>
            <Textarea {...register("additionalInfo")} placeholder="Additional Information" />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
}
