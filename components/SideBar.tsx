"use client"
import React from "react"
import { sidebarLinks } from "@/constant"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function SideBar() {
  const path = usePathname()
  console.log(path)

  return (
    <section className="min-w-[264px] px-2 md:px-3 py-5 bg-dark-1 hidden md:block">
      <div>
        {sidebarLinks.map((item, index) => (
          <Link
            href={item.route}
            key={index}
            className={cn("flex items-center gap-4 py-4 px-3 rounded-lg", {
              "bg-blue-1 ": item.route === path,
            })}
          >
            <Image src={item.imgURL} width={24} height={24} alt={item.label} />

            <p className="text-[18px] text-white">{item.label}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}