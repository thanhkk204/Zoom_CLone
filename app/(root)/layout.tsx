import StreamProvider from "@/prodviders/StreamProvider"
import React, { ReactNode } from "react"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamProvider>{children}</StreamProvider>
    </main>
  )
}
