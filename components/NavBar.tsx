import { SignedIn, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import MobileNav from "./MobileNav"

export default function NavBar() {
  return (
    <section className="sticky min-h-[80px] px-3 lg:px-6 flex items-center justify-between bg-dark-1">
      <Link href={"/"} className="flex items-center gap-1">
        <Image src="/icons/logo.svg" width={32} height={32} alt="Logo"></Image>
        <p className="text-white text-2xl font-bold">Yoom</p>
      </Link>
      <div className="flex items-center justify-between gap-5">
        <div className="sm:mr-10">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        </div>

        <MobileNav />
      </div>
    </section>
  )
}
