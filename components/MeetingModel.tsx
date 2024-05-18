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
}: MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 border-none">
        <div className="w-full md:max-w-[520px]  flex flex-col items-center gap-5 py-6 px-4">
          <div className="flex items-center ">
            {image && (
              <Image src={image} alt="title image" width={72} height={72} />
            )}
            <h2 className="text-white text-3xl font-bold">{title}</h2>
          </div>

          <div className="w-full">
            <DialogClose className="w-full outline-none border-none">
              <Button
                className="w-full bg-blue-1 py-6 px-2 text-white text-[19px]"
                onClick={handleClick}
              >
                {buttonIcon && (
                  <Image
                    src={buttonIcon}
                    alt="Button Icon"
                    width={13}
                    height={13}
                  />
                )}{" "}
                &nbsp;
                {buttonText || "Schedule Meeting"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
