"use client"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export default function useGetCallById(id: string | string[]) {
  const [call, setCall] = useState<Call>()
  const [isLoaded, setIsLoaded] = useState(true)
  const client = useStreamVideoClient()

  useEffect(() => {
    if (!client) return

    const getCall = async () => {
      const { calls } = await client?.queryCalls({ filter_conditions: { id } })

      if (calls.length > 0) setCall(calls[0])
      setIsLoaded(false)
    }
    getCall()
  }, [client, id])
  return { call, isLoaded }
}
