import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import {
  ClerkProvider
} from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"

import '@stream-io/video-react-sdk/dist/css/styles.css';

const fontSans = FontSans({
  subsets: ["latin"],
})
export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider 
      appearance={{
        layout: {
         logoImageUrl: '/icons/yoom-logo.svg'
        },
        variables:{
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1c1f2e",
          colorInputText: "#fff",
          colorInputBackground: "#252a41"

        }
      }}
      >
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased bg-dark-2",
            fontSans.className
          )}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  )
}
