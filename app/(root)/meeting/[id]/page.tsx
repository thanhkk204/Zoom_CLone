"use client"
import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetUp from "@/components/MeetingSetUp"
import useGetCallById from "@/hooks/useGetCallById"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useParams } from "next/navigation"
import { useState } from "react"
export default function MeetingPage() {
  const { id } = useParams()
  const [isSetUpCompleted, setIsSetUpCompleted] = useState(false)
  const { call, isLoaded } = useGetCallById(id)

  if (isLoaded) return <Loader />

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    )

  return (
    <section className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpCompleted ? (
            <MeetingSetUp setIsSetUpCompleted={setIsSetUpCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </section>
  )
}
