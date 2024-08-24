import { CaretDown, List } from "@phosphor-icons/react";
import { imgIXurl } from "../middleware/api";
import { useEffect, useState, useRef } from "react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

import NavSheet from "../components/NavSheet";
import { fetchUserInfo } from "@/middleware/user";

const Routes = ["Itinerary", "Horizons"];

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function Navbar() {
	const [selectedTab, setSelectedTab] = useState(null);
	const [getuserinfo, setuserinfo] = useState(null);
	const containerRef = useRef(null);

	const handleClickOutside = (event) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			if (selectedTab === 'Horizons') {
				setSelectedTab(null);
			}
		}
	};

	async function getUserData() {
		const tokenID = getCookie("trj_tid");
		const userInfo = await fetchUserInfo(tokenID);
		
		if (userInfo) {
			setuserinfo(userInfo)
		} else {
			console.log('Failed to fetch user information.');
		}
	}

	useEffect(()=>{
		getUserData()
	},[getuserinfo])

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [selectedTab]);

	function chekAndset(selected) {
		if (selectedTab === selected){
			return (setSelectedTab(null))
		} else {
			return (setSelectedTab(selected))
		}
	}

	return (
		<div className="w-[100%] h-[48px] xl:h-[64px] flex flex-row items-center justify-center absolute top-0 z-10">
			<div
				ref={containerRef}
				className={`xl:w-[1280px] w-[100%] bg-white h-[100%] flex flex-row items-center justify-between px-[16px] relative rounded-b-[12px]`}
			>
					<div className="flex flex-row items-center justify-start h-[100%]">
						{/* <div className="xl:hidden block pr-[20px]">
							
						</div> */}
						
						<div className="xl:hidden block">
							<NavSheet getuserinfo={getuserinfo} />
						</div>

						<div className="cursor-pointer" onClick={() => window.location.href='https://www.thereturnjourney.com/'}>
							<img
								src={`${imgIXurl}/react-webapp/Organisation/logo.jpg?lossless=true&w=440&h=122`}
								alt="The Return Journey Logo"
								loading="eager"
								className="w-[120px] h-[31.2px]"
							/>
						</div>

						<div className="xl:flex hidden flex-row items-center justify-start xl:gap-x-[24px] xl:ml-[24px]">
							<a
								key={"Home"}
								href={"https://www.thereturnjourney.com/"}
								aria-label={`Navbar Home Route`}
								className="Caption-1-Bold night-black"
							>
								{"Home"}
							</a>
							
							<span
								aria-label={`Navbar Itinerary Route`}
								className="Caption-1-Bold night-black flex flex-row relative pr-5 cursor-pointer"
								onClick={() => chekAndset('Itinerary')}
							>
								{"Itinerary"}
								<CaretDown weight="regular" size={16} className={`absolute right-0 ${ selectedTab === 'Itinerary' ? 'rotate-0 text-[#FF5903]' : 'rotate-180 text-[#454955]' }`} />
							</span>

							<a
								href={"https://www.thereturnjourney.com/foryou"}
								aria-label={`Navbar For You Route`}
								className="Caption-1-Bold night-black"
							>
								{"For You"}
							</a>
							<p
								href={""}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Navbar Community Route`}
								className="Caption-1-Bold night-black cursor-not-allowed"
							>
								{"Community"}
							</p>

							<span
								aria-label={`Navbar Horizons Route`}
								className="Caption-1-Bold night-black flex flex-row relative pr-5 cursor-pointer"
								onClick={() => chekAndset('Horizons')}
							>
								{"Horizons"}
								<CaretDown weight="regular" size={16} className={`absolute right-0 ${ selectedTab === 'Horizons' ? 'rotate-0 text-[#FF5903]' : 'rotate-180 text-[#454955]' }`} />
							</span>
						</div>
					</div>


					{
						getuserinfo &&
                        getuserinfo.id ?
						<img
							src={`${imgIXurl}/react-webapp/Account/dummy.png?lossless=true&w=127&h=127`}
							alt="The Return Journey Account Profile Picture"
							loadinwg="eager"
							className="w-[37px] h-[37px]"
						/>	:
						<a className="font-Syne font-semibold text-[16px] leading-[21px] tracking-[-0.32px] night-black">Sign In</a>
					}
					

					{
					Routes.includes(selectedTab) &&
					selectedTab === 'Itinerary' ? 
					<div className="w-[100%] h-[171px] bg-white absolute top-[64px] left-[0px] border-t-[#DADDE8] border border-b-transparent border-x-transparent">
						<div className="flex flex-row gap-x-[24px] px-[16px] pt-[16px]">
							<div className="flex flex-col gap-y-1">
								<div onClick={()=>{window.location.href='https://www.thereturnjourney.com/itinerary/occasion'; window.scrollTo(0, 0)}} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer">
									<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Craft New Itinerary</h2>
									<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Create stunning itineraries<br/>acc. to your preferences</p>
								</div>
								<h4 className="tertiary-black font-Inter font-medium text-[11px] leading-[13px] tracking-[0.07px] ml-[16px]">Open now for</h4>
								<h3 className="success-text font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px] ml-[16px] whitespace-nowrap">Himachal Pradesh</h3>
							</div>
							
							<div className="w-[1px] h-[40px] bg-[#DADDE8] m-auto" />

							<div className="flex flex-col gap-y-1">
								<div onClick={()=>{window.location.href='https://www.thereturnjourney.com/enquiryform'; }} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer">
									<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Submit Inquiry</h2>
									<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Submit an inquiry for <br/>personalised travel planning</p>
								</div>
								<h4 className="tertiary-black font-Inter font-medium text-[11px] leading-[13px] tracking-[0.07px] ml-[16px]">For</h4>
								<h3 className="success-text font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px] ml-[16px] whitespace-nowrap">All Other States</h3>
							</div>

							<div className="w-[1px] h-[40px] bg-[#DADDE8] m-auto" />

							<div className="flex flex-col gap-y-1">
								<div onClick={()=>{window.location.href="https://www.thereturnjourney.com/itineraryDashboard/upcomingItineraries"; window.scrollTo(0,0)}} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer">
									<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Upcoming Itineraries</h2>
									<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Buckle up, your favourite<br/>adventures are nearing!</p>
								</div>
							</div>

							<div className="w-[1px] h-[40px] bg-[#DADDE8] m-auto" />

							<div className="flex flex-col gap-y-1">
								<div onClick={()=>{window.location.href="https://www.thereturnjourney.com/itineraryDashboard/drafts"; window.scrollTo(0,0)}} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer">
									<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Drafts</h2>
									<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Customise what you’ve <br/>already created</p>
								</div>
							</div>

							<div className="w-[1px] h-[40px] bg-[#DADDE8] m-auto" />

							<div className="flex flex-col gap-y-1">
								<div onClick={()=>{window.location.href="https://www.thereturnjourney.com/itineraryDashboard/completedTrips"; window.scrollTo(0,0)}} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer">
									<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Completed Trips</h2>
									<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Storehouse of all your<br/>superb memories!</p>
								</div>
							</div>

						</div>
					</div> :
					selectedTab === 'Horizons' ?
					<div className="w-[120px] h-[0px] bg-red-300 absolute top-[64px] right-[50%]">
					</div> :
					null
				}			
			</div>
		</div>
	);
}
