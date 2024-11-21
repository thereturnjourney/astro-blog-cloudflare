import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { removeCookie, truncateText } from "@/functions/helper"
import { imgIXurl } from "@/middleware/api"
import { List } from "@phosphor-icons/react"


const TRJ_URL = import.meta.env.PUBLIC_TRJ_URL
const BLOG_URL = import.meta.env.PUBLIC_BLOG_URL
const NEW_DASHBOARD = import.meta.env.PUBLIC_NEW_DASHBOARD

export default function NavSheet({getuserinfo}) {
    const redirectTo = (url) => {
		window.scrollTo(0, 0);
		window.location.href = url;
	} 
    
    
	const handleLogout = () => {
		removeCookie("trj_tid"); 
		window.location.href  = `${TRJ_URL}/signin?to=${window.location.href}`
	}

    return (
        <Sheet key={"left"}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="ml-[-12px]" >
                    <List size={32} weight="bold" color="#454955" className="ml-[-12px]" />
                </Button>
            </SheetTrigger>

            <SheetContent side={"left"} className="bg-white ">
                <div className="flex flex-col items-start justify-start w-[100%]">
                    {   
                        getuserinfo &&
                        getuserinfo.id ?

                        <div className="w-[100%] flex flex-row items-center justify-between">
                            <div className="flex flex-row items-start justify-start gap-x-6">
                                <img 
                                    src={`${imgIXurl}react-webapp/Account/dummy-nav.png`}
                                    alt="profile not signed in TRJ"
                                    className="w-[48px] h-[48px] rounded-[6px]"
                                />
                                <div className="flex flex-col items-start justify-start gap-y-1">
                                    <h3 className="font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] text-black">{truncateText(getuserinfo.firstName,10)}</h3>
                                    <p className="font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px] secondary-text">@{truncateText(getuserinfo.socialUserModels[0].profileUsername,15)}</p>
                                </div>
                            </div>
                            <div onClick={()=> redirectTo(`${TRJ_URL}/account`)} >
                                <img 
                                    src={`${imgIXurl}react-webapp/Account/edit.png?lossless=true&w=80&h=80`}
                                    alt="edit profile for signed in TRJ"
                                    className="w-[20px] h-[20px] rounded-[6px]"
                                />
                            </div>
                        </div> :
                        <div className="w-[100%] flex flex-row items-center justify-center gap-x-6">
                            <img 
                                src={`${imgIXurl}AstroJs/IconsPack/face.png`}
                                alt="profile not signed in TRJ"
                                className="w-[32px] h-[32px]"
                            />
                            <Button onClick={handleLogout} className="w-[258px] py-[8px] font-Syne font-semibold text-[16px] leading-[21px] tracking-[-0.32px]" >
                                Sign Up
                            </Button>
                        </div>
                        
                    }
                    

                    <div className="w-[100%] flex flex-col items-start justify-start gap-y-4 mt-[32px]">
                        <span onClick={()=> redirectTo(NEW_DASHBOARD)} className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px]">
                            Home
                        </span>
                        <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                        <span onClick={()=> redirectTo(`${TRJ_URL}/enquiryform`)} className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">
                            Itinerary Enquiry
                        </span>
                        <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                        <span onClick={()=> redirectTo(`${TRJ_URL}/foryou`)} className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">
                            For You
                        </span>
                        <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                        <span onClick={()=> redirectTo(`${TRJ_URL}/aboutus`)} className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">
                            About
                        </span>
                        <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />

                        <span onClick={()=> redirectTo(BLOG_URL)} className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">
                            Blogs
                        </span>
                        
                        <div className="bg-[#E9E9E9] w-[100%] h-[1px]" />
                        <span onClick={()=> redirectTo(`${TRJ_URL}/vendor/dashboard`)} className="night-black font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px] mt-1">
                            Become a Supplier
                        </span>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
