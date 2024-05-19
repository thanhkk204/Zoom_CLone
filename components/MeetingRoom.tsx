"use client"
import { cn } from "@/lib/utils"
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react"
import { LayoutList, Users } from "lucide-react"
import { useRouter } from "next/navigation"

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"
export default function MeetingRoom() {
  const router = useRouter()
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipant, setShowParticipant] = useState(false)
  const { useParticipants, useLocalParticipant } = useCallStateHooks()

  const GetLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }
  return (
    <div className="w-full h-screen text-white relative">
      <div className="size-full flex items-center justify-center">
        <div className="size-full max-w-[1000px] flex items-center justify-center">
          <GetLayout />
        </div>
      </div>
        <div
          className={cn("h-screen absolute top-0 right-0 hidden ml-3", {
            block: showParticipant,
          })}
        >
            <div className="bg-dark-1 py-4 px-3 h-full">

          <CallParticipantsList onClose={() => setShowParticipant(false)} />
            </div>
        </div>
      {/* CallControl */}
      <div className="fixed bottom-0 w-full flex items-center justify-center gap-5">
        <CallControls onLeave={()=> router.push('/')}/>

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />

        <button onClick={() => setShowParticipant((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  )
}
