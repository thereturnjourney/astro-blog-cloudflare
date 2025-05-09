import { memo, useState, useEffect, Fragment } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {jwtDecode} from "jwt-decode"
import { Drawer, DrawerContent, DrawerTrigger } from  "@/components/ui/drawer"
import { DialogOverlay } from "@radix-ui/react-dialog";
import { staticUrl } from "@/functions/constant";

const TRJ_API_URL = import.meta.env.PUBLIC_TRJ_API_URL;
const googleAuthSecretKey = import.meta.env.PUBLIC_GOOGLE_AUTH_SECRET_KEY
const googleAuthToken = import.meta.env.PUBLIC_GOOGLE_AUTH_TOKEN;

const SocialLogin = (props) => {
    const { afterLogin } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isVerifying , setIsVerifying] = useState(0);
    const [isTabletOrLarger, setIsTabletOrLarger] = useState(window.innerWidth >= 768);


    const postSocialLogin = (data) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        const promise = new Promise((resolve, reject) => {
            fetch(`${TRJ_API_URL}/users/getSocialLogin`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            }).then((response) => resolve(response.json())).catch((error) => reject(error))
        })

        return promise;
    }
    
    const setCookie = (name, value, additional) => {
        const { days, path = "/", domain = "", secure = false, sameSite = "Lax" } = additional;
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      
        if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          cookie += `; expires=${date.toUTCString()}`;
        }
      
        cookie += `; path=${path}`;
      
        if (domain) {
          cookie += `; domain=${domain}`;
        }
      
        if (secure) {
          cookie += `; secure`;
        }
      
        if (sameSite) {
          cookie += `; samesite=${sameSite}`;
        }
      
        document.cookie = cookie;
    }

    const handleCredentialResponse = async (response) => {
        const userInfo = jwtDecode(response.credential || response.code);
        let payload = {
            "profileName": userInfo.name,
            "profileEmail": userInfo.email,
            "profileUsername": '',
            "profileId": '',
            "profileImage": userInfo.picture,
            "profileType": 'GOOGLE',
            "profileMobileNumber": '',
            "profileObject": userInfo,
            "profileFirstName": userInfo.given_name,
            "profileLastName": userInfo.family_name,
            "profileDob": "",
            "additionalProp1": {}
        }
        setIsVerifying(true)    
        const data = await postSocialLogin(payload);
        setIsVerifying(false)
        setCookie("trj_tid", data.token, { days: 28, path: "/", domain: ".thereturnjourney.com", secure: true, sameSite: "None" });
        setCookie("trj_tid", data.token, { days: 28, path: "/", domain: "localhost", secure: true, sameSite: "None" });
        afterLogin(data);
        setIsOpen(false);
    };
    

    const getIdTokenFromCode = async (code) => {
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', googleAuthToken);
        params.append('client_secret', googleAuthSecretKey);
        params.append('redirect_uri', window.location.origin);
        params.append('grant_type', 'authorization_code');
        setIsVerifying(true);
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
    
        const data = await response.json();
    
        handleCredentialResponse({...data, credential: data.id_token});
    }

    const handleGoogleClick = () => {
        if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
            console.error('Google Sign-In SDK not loaded yet');
            return;
        }
    
        const client = window.google.accounts.oauth2.initCodeClient({
            client_id: googleAuthToken,
            scope: 'openid email profile',
            ux_mode: 'popup',
            callback: (response) => {
                if (response.code) {
                    getIdTokenFromCode(response.code);
                } else {
                    console.error('No code returned');
                }
            },
        });
    
        client.requestCode();
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsTabletOrLarger(window.innerWidth > 768);
            };
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
    
        script.onload = () => {
            if (window.google && window.google.accounts.id) {
                window.google.accounts.id.initialize({
                    client_id: googleAuthToken,
                    callback: handleCredentialResponse,
                    auto_select: false,
                });
    
                window.google.accounts.id.prompt();
            }
        };
    
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    const content = () => {
        return (
            <Fragment>
                <div className="flex flex-col gap-[8px] items-center tab:h-[0px]">
                    <h1 className="font-Manrope font-semibold text-[#454955] tab:text-[#1D1F24] text-[14px] leading-[100%] tracking-[0.4] tab:text-[32px] tab:tracking-[-0.3px]">
                        Unlock the Full Journey
                    </h1>
                    <p className="px-[26px] font-Manrope font-semibold tab:font-Inter tab:font-normal text-[#1D1F24] tab:text-[#454955] text-[17px] tab:text-[21px] leading-[100%] tracking-[0.1px] tab:tracking-[-0.2px]">
                        Sign in to unlock tailored trips, hidden gems, and exclusive travel perks — all curated just for you
                    </p>
                </div>
                <div className="flex flex-col gap-[16px] px-[24px] pt-[24px]">
                    <div 
                        onClick={handleGoogleClick}
                        className="w-[100%] h-[40px] tab:h-[69px] rounded-[8px] tab:rounded-[12px] bg-[#F4F4F8] flex items-center gap-[20px] justify-center cursor-pointer hover:bg-[#E8E8EC] transition-colors duration-200">
                        {
                            isVerifying 
                            ? <span className="loader w-[24px] tab:w-[41px] h-[24px] tab:h-[41px] before:border-[#FF5903] before:border-[3px]"></span>
                            : <img
                                src={`${staticUrl}/B2C-Website/Google.webp`}
                                className="w-[24px] tab:w-[41px] h-[24px] tab:h-[41px]"
                                alt="Google Sign In"
                            />
                        }
                        <p className="font-Manrope font-semibold text-[#1D1F24] text-[17px] tracking-[0.1px] tab:text-[24px] leading-[100%]">
                            Google
                        </p>
                    </div>
                </div>
                <div className="rounded-b-[16px] flex items-center justify-center absolute left-0 bottom-0 w-[100%] h-[94px] tab:h-[81px] bg-[#FBFCFD] px-[48px]">
                    <p className="font-Inter font-normal text-[#454955] text-[14px] tab:text-[17px] leading-[100%] tracking-[0.4px] tab:tracking-[0.1px]">
                        By continuing, you agree to our <a href={"/privacypolicy"} className="text-[#0094FF] cursor-pointer hover:opacity-75">Privacy Policies</a> and <a href={"/seg-terms"} className="text-[#0094FF] cursor-pointer hover:opacity-75">Terms of Service</a>
                    </p>
                </div>
            </Fragment>
        )
    }

    if(isTabletOrLarger) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogOverlay className="backdrop-blur-[6px] bg-[#1D1F2459] bg-blend-multiply"></DialogOverlay>
                <DialogTrigger asChild>
                    { props.children }
                </DialogTrigger>
                
                <DialogContent className="bg-[#FFFFFF] rounded-[16px] w-[731px] h-[400px] p-[40px]">
                    { content() }
                </DialogContent>
            </Dialog>
        );
    } else {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen} key={"bottom"}>
                <DrawerTrigger asChild>
                    { props.children }
                </DrawerTrigger>

                <DrawerContent side={"bottom"} className="h-[300px] bg-[#FFF] surface-brand-neutral-5 border-none px-0 pt-0 pb-3">
                    <div className='flex flex-row items-center justify-center w-[100%] pb-4 mt-[-8px]' >
                        <div className='w-[32px] h-[4px] rounded-[4px] bg-[#DADDE8]' />
                    </div>
                    
                    {
                        content()
                    }
                </DrawerContent>
            </Drawer>
        )
    }
};

export default memo(SocialLogin);