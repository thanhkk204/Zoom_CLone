import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Metadata } from 'next';
import { ReactNode } from 'react';


export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
}
const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <NavBar />

      <div className="flex">
        <SideBar />
        
        <section className="flex min-h-[calc(100vh-80px)] flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout