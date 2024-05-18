"use client"
import Image from "next/image"
import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModel from "./MeetingModel"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs"
import { toast } from "./ui/use-toast"

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
}
export default function MeetingTypeList() {
  const router = useRouter()
  const [meetingSate, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined)
  const [values, setValues] = useState(initialValues)
  const client = useStreamVideoClient()
  const { user } = useUser()
  const [detailCall, setDetailCall] = useState<Call>()

  const createMeeting = async () => {
    if (!user || !client) return

    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID()
      const call = client.call("default", id)
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant Meeting"

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })

      setDetailCall(call)
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });

    } catch (error) {
      toast({ title: 'Failed to create Meeting' });
    }
  }
  console.log(detailCall)
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 ">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        bgColor="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join a Meeting"
        description="via invitation link"
        bgColor="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        bgColor="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        bgColor="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModel
        isOpen={meetingSate === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        buttonText="Create Meeting"
        title="Start an instance meeting"
        handleClick={() => createMeeting()}
      />
    </section>
  )
}
