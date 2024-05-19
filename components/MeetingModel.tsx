import React, { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from "./ui/button"
interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  children?: ReactNode
  handleClick?: () => void
  buttonText?: string
  instantMeeting?: boolean
  image?: string
  buttonClassName?: string
  buttonIcon?: string
}
export default function MeetingModel({
  isOpen,
  onClose,
  image,
  buttonText,
  buttonIcon,
  handleClick,
  title,
  children
}: MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 border-none">
        <div className="w-full md:max-w-[520px]  flex flex-col items-center gap-5 py-4 px-2">
          <div className="flex flex-col items-center gap-3">
            {image && (
              <Image src={image} alt="title image" width={72} height={72} />
            )}
            <h2 className="text-white text-3xl font-bold">{title}</h2>
          </div>
           {children && children}
          <div className="w-full border-none">
              <Button
                className="w-full bg-blue-1 py-6 px-2 text-white text-[19px] focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleClick}
              >
                {buttonIcon && (
                  <Image
                    src={buttonIcon}
                    alt="Button Icon"
                    width={18}
                    height={18}
                  />
                )}{" "}
                &nbsp;
                {buttonText || "Schedule Meeting"}
              </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
