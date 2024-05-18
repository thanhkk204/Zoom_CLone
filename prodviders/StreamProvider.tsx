"use client"
import TokenProvider from "@/actions/TokenProvider"
import Loader from "@/components/Loader"
import { useUser } from "@clerk/nextjs"
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk"
import { ReactNode, useEffect, useState } from "react"

const API_KEY = process.env.NEXT_PUBLIC_STREAM_KEY

//   const client = new StreamVideoClient({ apiKey, user, token });

const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!user || !isLoaded) return
    if (!API_KEY) throw new Error("Apikey of stream is missing")
    
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.fullName || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: TokenProvider,
    })
    setVideoClient(client)
  }, [user, isLoaded])
  
  if (!videoClient) return <Loader />
  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}

export default StreamProvider
