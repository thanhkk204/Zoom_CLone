"use client"
import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function MeetingSetUp({setIsSetUpCompleted}:{setIsSetUpCompleted:(value: boolean)=>void}) {
  const call = useCall()
  const [micAndCamState, setMicAndCamState] = useState(false)

  useEffect(() => {
    if (!call) return
    if (!micAndCamState) {
      call.camera.disable()
      call.microphone.disable()
      console.log('disable')
    } else {
      console.log('enable')
      call.camera.enable()
      call.microphone.enable()
    }
  }, [micAndCamState])
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="py-12 px-10 bg-dark-1 rounded-lg flex flex-col items-center gap-5">
        <h2 className="text-3xl text-white font-bold">Set Up</h2>
        <div className="border-none">
          <VideoPreview className="border-none outline-none"/>
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="toggleMicAndCam" className="text-white cursor-pointer flex items-center gap-1">
            <input
              type="checkbox"
              id="toggleMicAndCam"
              onChange={(e) => setMicAndCamState(e.target.checked)}
            />
            Join meeting with camera and micro phone
          </label>
          <div className="text-white font-thin">

          <DeviceSettings />
          </div>
        </div>

        <Button 
         onClick={()=>{
          call?.join()
          setIsSetUpCompleted(true)
         }}
        className="py-6 px-3 bg-green-600 text-white text-[18px]"
        >Get in Room
        </Button>
      </div>
    </div>
  )
}
