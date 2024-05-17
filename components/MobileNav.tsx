"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "@/constant"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function MobileNav() {
  const path = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="hamburger icon"
          className="cursor-pointer sm:hidden"
        />
      </SheetTrigger>

      <SheetContent side="left" className="border-none bg-dark-1">
        <SheetClose asChild>
          <Link href="/" className="flex items-center gap-1 pl-2">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="yoom logo"
            />
            <p className="text-[26px] font-extrabold text-white">YOOM</p>
          </Link>
        </SheetClose>

        <div className="h-full py-6">
          <section className="flex flex-col">
            {sidebarLinks.map((item, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={item.route}
                  className={cn(
                    "flex items-center gap-4 py-4 px-3 rounded-lg",
                    {
                      "bg-blue-1 ": item.route === path,
                    }
                  )}
                >
                  <Image
                    src={item.imgURL}
                    width={24}
                    height={24}
                    alt={item.label}
                  />

                  <p className="text-[18px] text-white">{item.label}</p>
                </Link>
              </SheetClose>
            ))}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
