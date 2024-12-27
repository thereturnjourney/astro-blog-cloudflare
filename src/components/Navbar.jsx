import { CaretDown, CaretRight, QuestionMark, SignOut, UserCheck } from "@phosphor-icons/react";
import { imgIXurl } from "../middleware/api";
import { useEffect, useState, useRef, Fragment } from "react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

import NavSheet from "../components/NavSheet";
import { fetchUserInfo } from "@/middleware/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import CircularProgress from "./CircularProgress";
import { getCookie, removeCookie } from "@/functions/helper";

const Routes = ["Itinerary", "Horizons"];
const TRJ_URL = import.meta.env.PUBLIC_TRJ_URL
const BLOG_URL = import.meta.env.PUBLIC_BLOG_URL
const NEW_DASHBOARD = import.meta.env.PUBLIC_NEW_DASHBOARD

export default function Navbar() {
	const [selectedTab, setSelectedTab] = useState(null);
	const [getuserinfo, setuserinfo] = useState(null);
	const [userCompletion, setUserCompletion] = useState(0);
	const [userFullName, setUserFullName] = useState("Himanshu Phalak")
	const dropDownRef = useRef(null);
	const navBarRef = useRef(null);
	const tokenID = getCookie("trj_tid");

	const handleClickOutside = (event) => {
		if (
			(dropDownRef.current && !dropDownRef.current.contains(event.target)) &&
			(navBarRef.current && !navBarRef.current.contains(event.target))
		) {
			if (selectedTab) {
				setSelectedTab(null);
			}
		}
	};

	async function getUserData() {
		if(!tokenID) return;
		const userInfo = await fetchUserInfo(tokenID);
		
		if (userInfo) {
			setuserinfo(userInfo)
			setUserCompletion(userInfo.profileCount)
			setUserFullName(`${userInfo.firstName} ${userInfo.lastName}`)
		} else {
			console.log('Failed to fetch user information.');
		}
	}

	const redirectTo = (url) => {
		window.scrollTo(0, 0);
		window.location.href = url;
	} 

	const handleLogout = () => {
		removeCookie("trj_tid"); 
		if(getCookie("trj_tid") === undefined) {
			setuserinfo(null);
			window.location.href  = `${TRJ_URL}/signin?to=${window.location.href}`
		} 
	}


	useEffect(()=>{
		getUserData()
	},[])

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
		<div className="fixed top-[0px] left-[auto] w-[100%] h-[48px] xl:h-[64px] flex flex-row items-center justify-center z-10">
			<div
				ref={navBarRef}
				className={`xl:w-[1280px] w-[100%] bg-white h-[100%] flex flex-row items-center justify-between px-[16px] relative rounded-b-[12px] border border-[#E9E9E9]`}
			>
					<div className="flex flex-row items-center justify-start h-[100%]">
						{/* <div className="xl:hidden block pr-[20px]">
							
						</div> */}
						
						<div className="xl:hidden block">
							<NavSheet getuserinfo={getuserinfo} />
						</div>

						<div className="cursor-pointer" onClick={() => redirectTo(NEW_DASHBOARD)}>
							<img
								src={`${imgIXurl}/react-webapp/Organisation/logo.jpg?lossless=true&w=440&h=122`}
								alt="The Return Journey Logo"
								loading="eager"
								className="w-[120px] h-[31.2px]"
							/>
						</div>

						<div  className="xl:flex hidden flex-row items-center justify-start xl:gap-x-[24px] xl:ml-[24px]">
							<span
								key={"Home"}
								onClick={() => redirectTo(NEW_DASHBOARD)}
								aria-label={`Navbar Home Route`}
								className="Caption-1-Bold night-black"
							>
								{"Home"}
							</span>
							
							<span
								aria-label={`Navbar Itinerary Route`}
								className="Caption-1-Bold night-black flex flex-row gap-[4px] relative cursor-pointer"
								onClick={() => chekAndset('Itinerary')}
							>
								{"Itinerary"}
								<CaretDown weight="regular" size={16} className={` ${ selectedTab === 'Itinerary' ? 'rotate-0 text-[#FF5903]' : 'rotate-180 text-[#454955]' }`} />
							</span>

							<span
								onClick={() => redirectTo(`${TRJ_URL}/foryou`)}
								aria-label={`Navbar For You Route`}
								className="Caption-1-Bold night-black"
							>
								{"For You"}
							</span>
							<p
								href={""}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Navbar Community Route`}
								className="Caption-1-Bold night-black cursor-not-allowed"
							>
								{"Community"}
							</p>

							<div
								ref={dropDownRef}
								aria-label={`Navbar Horizons Route`}
								className="Caption-1-Bold night-black flex flex-row relative gap-[4px] cursor-pointer"
								onClick={() => chekAndset('Horizons')}
							>
								<span>Horizons</span>
								<CaretDown weight="regular" size={16} className={` ${ selectedTab === 'Horizons' ? 'rotate-0 text-[#FF5903]' : 'rotate-180 text-[#454955]' }`} />
								
								{
									selectedTab === 'Horizons' &&
									<div className="w-[160px] rounded-[12px] bg-white absolute top-[300%] right-[0px] flex flex-col items-start justify-start">
										<a onClick={() => redirectTo(`${TRJ_URL}/aboutus`)} aria-label={`Navbar About Route`} className="py-[12px] px-[16px] cursor-pointer hover:bg-[#e1e3e9] hover:rounded-t-[12px] w-[100%] pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]">
											About
										</a>
										<div className="w-[100%] h-[1px] bg-[#DADDE8]" />
										<a onClick={() => redirectTo(`${BLOG_URL}`)} aria-label={`Navbar Blogs Route`} className="py-[12px] px-[16px] cursor-pointer hover:bg-[#e1e3e9] hover:rounded-b-[12px] w-[100%] pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]">
											Blogs
										</a>
									</div>
								}
							</div>

							<span
								onClick={() => redirectTo(`${TRJ_URL}/vendor/dashboard`)}
								aria-label={`Become a Supplier`}
								className="Caption-1-Bold night-black"
							>
								Become a Supplier
							</span>
						</div>
					</div>


					{
						!getuserinfo && !tokenID &&
						<a onClick={() => redirectTo(`${TRJ_URL}/signin?to=${window.location.href}`)} className="font-Syne font-semibold text-[16px] leading-[21px] tracking-[-0.32px] night-black cursor-pointer">
							Sign In
						</a>
					}

					
					{
						!getuserinfo && tokenID &&
						<span className="loader w-[30px] h-[30px]"></span>
					}

					{
						tokenID && getuserinfo &&
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="relative w-[34px] h-[34px]">
									<img 
										src={`${imgIXurl}/react-webapp/Account/dummy.png?lossless=true&h=1408&w=1045`}
										className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  w-[30px] h-[30px] object-cover"
									/>
									<CircularProgress
										value={userCompletion}
										size={40}
										className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
									/>
									{
										getuserinfo &&
										<DropdownMenuContent className="w-56 h-[auto] absolute top-[20px] right-[-20px] bg-white z-50 p-0 gap-0">
											<DropdownMenuItem className="hover:bg-[#e1e3e9] m-0 px-[16px] py-[12px] cursor-pointer" onClick={() => redirectTo(`${TRJ_URL}/account/personaldetails`)}>
												<div className="flex flex-col w-[100%]">
													<div className="flex flex-row items-start justify-start w-[100%]">
														<img 
															src={`${imgIXurl}/react-webapp/Account/dummy.png?lossless=true&w=37&h=37`}
															alt={"THE RETURN JOURNEY " + getuserinfo.firstName} 
															loading="lazy"
														/>
														<div className="flex flex-row justify-between items-center ml-[8px] w-[100%]">
															<div className="flex flex-col justify-center items-start h-[100%]">
																<p className="text-[#454955] font-Manrope font-semibold text-[13px] leading-[13px] tracking-[0.07px]">Hello!</p>
																<div className="flex flex-row items-center justify-start w-[100%] h-[100%]">
																	<p className="text-[#0D0A0B] font-Manrope font-semibold text-[15px] leading-[18px] tracking-[-0.08px]">
																		{ userFullName.length > 15 ? userFullName.substring(0, 15) + '..' : userFullName }
																	</p>
																	{
																		getuserinfo?.mobileVerificationFlag ? 
																		<UserCheck 
																			weight="bold"
																			className="ml-[4px] text-[#83868E] w-[16px] h-[16px]" 
																		/>
																		:null
																	}
																</div>
																{ 
																	userCompletion === 100 ? 
																	<p className="font-Inter font-medium text-[11px] leading-[13px] tracking-[0.07px] text-[#4CAF50] mt-[4px]">
																		Adventure Achiever
																	</p> 
																	: null
																}
															</div>

															<CaretRight 
																weight="bold" 
																className="text-[#454955] w-[20px] h-[20px]" 
															/>
														</div>
													</div>

													{
													userCompletion !== 100 &&
													<Fragment>
														<p className="font-Inter font-medium text-[10px] leading-[13px] tracking-[0.07px] text-[#454955] uppercase mt-[12px]">{`Profile Completion ${userCompletion}%`}</p>
														<div className="relative w-[100%] h-[12px] rounded-[30px] my-[4px] bg-[#EAEAEA]">
															<div style={{ width: `${userCompletion}%` }} className={`${ userCompletion <= 40 ? 'bg-[#9AE0FD]' : userCompletion <= 60 ? 'bg-gradient-to-r from-[#9AE0FD] to-[#FFAF86]' : 'bg-gradient-to-r from-[#9AE0FD] via-[#FFAF86] to-[#8BDD91]' } transition-width duration-500 ease-in-out h-[12px] rounded-[30px]`}>
															{[...Array(9)].map((_, index) => (
																<div
																	key={index}
																	className="absolute top-0 h-[12px] bg-gray-300"
																	style={{
																		left: `${(index + 1) * 10}%`,
																	width: '2px', 
																	transform: 'translateX(-50%)',
																}}
															/>
														))}
														</div>
													</div>
													<span className="text-[#454955] font-Inter font-medium text-[11px] leading-[13px] tracking-[0.07px]">Complete your profile, earn the Adventurer Badge, and stand out!</span>
													</Fragment>
												}
												</div>
											</DropdownMenuItem>
											<DropdownMenuSeparator  className="m-0 bg-[#e1e3e9]"/>
											<DropdownMenuItem onClick={() => redirectTo(`${TRJ_URL}/help&feedback?tab=submitFeedback`)} className="m-0 px-[16px] py-[12px] hover:bg-[#e1e3e9] cursor-pointer">
												<QuestionMark 
													weight="bold" 
													className="text-[#454955] w-[20px] h-[20px]" 
												/>
												<span className="font-Manrope font-semibold text-[15px] leading-[18px] tracking-[-0.08px] text-[#0D0A0B] ml-[8px]">Help & Feedback</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator  className="m-0 bg-[#e1e3e9]"/>
											<DropdownMenuItem onClick={handleLogout} className="hover:bg-[#e1e3e9] m-0 cursor-pointer px-[16px] py-[12px]">
												<SignOut
													weight="bold" 
													className="text-[#454955] w-[20px] h-[20px]" 
												/>
												<span className="font-Manrope font-semibold text-[14px] xl:text-[15px] leading-[16px] xl:leading-[18px] xl:tracking-[-0.08px] text-[#0D0A0B] ml-[8px]">Log Out</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									}
								</div>
							</DropdownMenuTrigger>
						</DropdownMenu>
					}
					{
						Routes.includes(selectedTab) &&
						selectedTab === 'Itinerary' ? 
						<div ref={dropDownRef} className="w-[100%] h-[171px] bg-white absolute top-[110%] left-[0px] border-t-[#DADDE8] border border-b-transparent border-x-transparent xl:rounded-[16px]">
							<div className="flex flex-row gap-x-[24px] px-[16px] pt-[16px]">
								<div className="flex flex-col gap-y-1">
									<div onClick={() => redirectTo(`${TRJ_URL}/itinerary/occasion`)} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer rounded-[16px] hover:bg-[#FFF0E9]">
										<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Craft New Itinerary</h2>
										<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Create stunning itineraries<br/>acc. to your preferences</p>
									</div>
									<h4 className="tertiary-black font-Inter font-medium text-[11px] leading-[13px] tracking-[0.07px] ml-[16px]">Open now for</h4>
									<h3 className="success-text font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px] ml-[16px] whitespace-nowrap">Himachal Pradesh</h3>
								</div>
								
								<div className="w-[1px] h-[40px] bg-[#DADDE8] mt-[28px]" />

								<div className="flex flex-col gap-y-1">
									<div onClick={() => redirectTo(`${TRJ_URL}/enquiryform`)}  className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer rounded-[16px] hover:bg-[#FFF0E9]">
										<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Submit Inquiry</h2>
										<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Submit an inquiry for <br/>personalised travel planning</p>
									</div>
									<h4 className="tertiary-black font-Inter font-medium text-[11px] leading-[13px] tracking-[0.07px] ml-[16px]">For</h4>
									<h3 className="success-text font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px] ml-[16px] whitespace-nowrap">All Other States</h3>
								</div>

								<div className="w-[1px] h-[40px] bg-[#DADDE8] mt-[28px]" />

								<div className="flex flex-col gap-y-1">
									<div onClick={() => redirectTo(`${TRJ_URL}/itineraryDashboard/upcomingItineraries`)} className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer rounded-[16px] hover:bg-[#FFF0E9]">
										<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Upcoming Itineraries</h2>
										<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Buckle up, your favourite<br/>adventures are nearing!</p>
									</div>
								</div>

								<div className="w-[1px] h-[40px] bg-[#DADDE8] mt-[28px]" />

								<div className="flex flex-col gap-y-1">
									<div onClick={() => redirectTo(`${TRJ_URL}/itineraryDashboard/itineraryDashboard/drafts`)}  className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer rounded-[16px] hover:bg-[#FFF0E9]">
										<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Drafts</h2>
										<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Customise what you’ve <br/>already created</p>
									</div>
								</div>

								<div className="w-[1px] h-[40px] bg-[#DADDE8] mt-[28px]" />

								<div className="flex flex-col gap-y-1">
									<div onClick={() => redirectTo(`${TRJ_URL}/itineraryDashboard/completedTrips`)}  className="w-[205px] h-[92px] px-[16px] pt-[16px] pb-[24px] flex flex-col items-start justify-start gap-y-1 cursor-pointer rounded-[16px] hover:bg-[#FFF0E9]">
										<h2 className="pure-black font-Inter font-medium text-[15px] leading-[20px] tracking-[-0.24px]" >Completed Trips</h2>
										<p className="tertiary-black font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px]">Storehouse of all your<br/>superb memories!</p>
									</div>
								</div>
							</div>
						</div> :
						null
					}			
			</div>
		</div>
	);
}
