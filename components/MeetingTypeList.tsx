"use client"
import Image from "next/image"
import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModel from "./MeetingModel"
import {
  Call,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs"
import { toast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker'
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
  const [callDetail, setCallDetail] = useState<Call>()

  const createMeeting = async () => {
    console.log(meetingSate)
    if (!user || !client) return

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" })
        return
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

      setCallDetail(call)
      if (!values.description && meetingSate !== 'isScheduleMeeting') {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: "Meeting Created",
      })
    } catch (error) {
      toast({ title: "Failed to create Meeting" })
    }
  }
  console.log(meetingSate)
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;
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
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        bgColor="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join a Meeting"
        description="via invitation link"
        bgColor="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        bgColor="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      {/* For schedule meeting */}
      {!callDetail ? (
        <MeetingModel
          isOpen={meetingSate === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          buttonText="Create"
          title="Schedule for a meeting"
          handleClick={() => createMeeting()}
        >
           <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none text-white"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
        isOpen={meetingSate === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink);
          setCallDetail(undefined)
          setMeetingState(undefined)
          setValues(initialValues)
          toast({ title: 'Link Copied' });
        }}
        image={'/icons/checked.svg'}
        buttonIcon="/icons/copy.svg"
        className="text-center"
        buttonText="Copy Meeting Link"
      />
      )}
      {/* For instance meeting */}
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
