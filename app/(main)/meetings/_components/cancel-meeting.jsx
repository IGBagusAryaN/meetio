"use client";

import { cancelMeeting } from "@/app/actions/meetings";
import useFetch from "@/app/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CancelMeetingButton({ meetingId }) {
  const router = useRouter();

  const { loading, fn: fnCancelMeeting } = useFetch(cancelMeeting, {
    successMessage: "Meeting canceled successfully",
    errorMessage: "Failed to cancel meeting",
  });

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this meeting?")) {
      await fnCancelMeeting(meetingId);
      router.refresh();
    }
  };

  return (
    <Button variant="destructive" onClick={handleCancel} disabled={loading}>
      {loading ? "Canceling..." : "Cancel Meeting"}
    </Button>
  );
}
