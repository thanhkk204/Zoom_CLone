"use client"
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useState } from 'react'

export default function MeetingTypeList() {
   const [meetingSate, setMeetingState] = useState('')
   console.log(meetingSate);
   
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>

    <HomeCard 
     img="/icons/add-meeting.svg"
     title="New Meeting"
     description="Start an instant meeting"
     bgColor= "bg-orange-1"
     handleClick={() => setMeetingState('isInstantMeeting')}/>
    <HomeCard 
     img="/icons/add-personal.svg"
     title="Join a Meeting"
     description="Join an existed meeting"
     bgColor="bg-blue-1"
     handleClick={() => setMeetingState('isInstantMeeting')}/>
    <HomeCard 
     img="/icons/add-meeting.svg"
     title="New Meeting"
     description="Start an instant meeting"
     bgColor= "bg-purple-1"
     handleClick={() => setMeetingState('isInstantMeeting')}/>
    <HomeCard 
     img="/icons/add-meeting.svg"
     title="New Meeting"
     description="Start an instant meeting"
     bgColor= "bg-yellow-1"
     handleClick={() => setMeetingState('isInstantMeeting')}/>


    </section>
  )
}
