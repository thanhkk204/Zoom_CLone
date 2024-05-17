"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

export default function Metting() {
    const user = useUser()
    console.log(user);
    
  return (
    <div>Metting</div>
  )
}
