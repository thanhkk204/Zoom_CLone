"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY
const secretKey = process.env.STREAM_SECRET_KEY
export default async function TokenProvider() {
  const user = await currentUser()
  if (!user) throw new Error("User is not authenticated")
  if (!apiKey) throw new Error("Stream API key secret is missing")
  if (!secretKey) throw new Error("Stream API secret is missing")

  const client = new StreamClient(apiKey, secretKey)
  
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60
  const issuedAt = Math.floor(Date.now() / 1000) - 60
  const token = client.createToken(user.id, exp, issuedAt)
  return token
}
