"use client"
import Image from 'next/image'
import React from 'react'
type propType = {
    img:string,
    title:string,
    description: string
    bgColor: string,
    handleClick?: ()=> void
}
export default function HomeCard({img, description, title, handleClick, bgColor}: propType) {
  return (
    <div 
     onClick={handleClick}
    className={`${bgColor} px-3 py-4 w-full sm:min-w-[270px] min-h-[260px] rounded-xl cursor-pointer flex flex-col justify-between`}
    >
    <div className='glassmorphism size-12 rounded-lg flex items-center justify-center'>
        <Image
        src="/icons/add-personal.svg"
        alt={title}
        width={27}
        height={27}
        />
    </div>
    <div>
      <h2 className='py-2 font-bold text-[20px]'>{title}</h2>
      <p>{description}</p>
    </div>
 </div>
  )
}