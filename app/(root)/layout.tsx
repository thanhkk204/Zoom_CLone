import StreamProvider from "@/prodviders/StreamProvider"
import { Metadata } from "next"
import React, { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamProvider>{children}</StreamProvider>
    </main>
  )
}
