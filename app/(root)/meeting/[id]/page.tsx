"use client"
import { useParams } from "next/navigation"
export default function MeetingPage() {
    const {id} = useParams()
  return (
    <div>MeetingPage: {id}</div>
  )
}
