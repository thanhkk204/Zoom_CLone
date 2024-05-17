import { SignUp } from '@clerk/nextjs'

export default function page() {
  return (
    <main className='w-full h-screen flex items-center justify-center'>
        <SignUp/>
    </main>
  )
}
