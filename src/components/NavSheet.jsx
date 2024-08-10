import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { imgIXurl } from "@/middleware/api"

import { List } from "@phosphor-icons/react"

export default function NavSheet() {
  return (
    <Sheet key={"left"}>
        <SheetTrigger asChild>
            <Button variant="ghost" className="ml-[-12px]" >
                <List size={24} weight="regular" color="#0D0A0B" className="ml-[-12px]" />
            </Button>
        </SheetTrigger>

        <SheetContent side={"left"} className="bg-white">
            <div className="flex flex-col items-start justify-start w-[100%]">
                <div className="w-[100%] flex flex-row items-center justify-center gap-x-6">
                    <img 
                        src={`${imgIXurl}AstroJs/IconsPack/face.png`}
                        alt="profile not signed in TRJ"
                        className="w-[32px] h-[32px]"
                    />
                    <Button className="w-[258px] py-[8px] font-Syne font-semibold text-[16px] leading-[21px] tracking-[-0.32px]" >
                        Sign Up
                    </Button>
                </div>

                <div className="w-[100%] flex flex-col items-start justify-start gap-y-4 mt-[32px]">
                    <a href="https://www.thereturnjourney.com/" className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px]">Home</a>
                    <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                    <a href="https://www.thereturnjourney.com/enquiryform" className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">Itinerary Enquiry</a>
                    <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                    <a href="https://www.thereturnjourney.com/foryou" className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">For You</a>
                    <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                    <a href="https://www.thereturnjourney.com/aboutus" className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">About</a>
                    <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                    <a href='/' className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">Blogs</a>
                </div>
            </div>
        </SheetContent>
    </Sheet>
  )
}
