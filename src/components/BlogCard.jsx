import React, { useEffect, useState } from 'react';
import { slugify, truncateText } from '../functions/helper';

export default function Blogcard(props) {
    const { id, blogTitle, minRead, date, description, bannerImage } = props;

    const [truncateLength, setTruncateLength] = useState(40);

    // Set truncate length based on screen size
    const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) { // xl screens
            setTruncateLength(150);
        } else if (screenWidth >= 768) { // tab screens
            setTruncateLength(100);
        } else { // mobile screens
            setTruncateLength(40);
        }
    };

    useEffect(() => {
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Update on resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    }, []);


    return (
        <article 
            onClick={() => window.location.href=`/details/${id}/${slugify(blogTitle)}`} 
            className="cursor-pointer flex flex-col items-start justify-start w-[328px] tab:w-[360px] xl:w-[400px] h-[369px] tab:h-[404px] xl:h-[443px] rounded-[12px] tab:rounded-[16px] p-[8px] tab:p-[12px] xl:p-[16px] border border-[#E9E9E9]"
        >
            <div className="w-[100%] h-[178px] tab:h-[215px] xl:h-[224px] rounded-t-[14px]">
                <img 
                    alt="Blog The Return Journey Cover Picture" 
                    src={bannerImage[0]}
                    loading='lazy'
                    className="rounded-t-[14px] h-[100%] w-[100%] object-cover object-top"
                />
            </div>

            <div className="w-[100%] text-[#454955] flex flex-row items-center justify-between mt-3 tab:mt-4 xl:mt-2 font-Inter font-medium tab:text-[13px] tab:leading-[18px] tab:tracking-[-0.08px]">
                <h4>{date}</h4>
                <h4>{minRead}</h4>
            </div>

            <h3 className="text-[#0D0A0B] font-Syne font-semibold tab:text-[17px] tab:leading-[20.4px] tab:tracking-[-0.26px] mt-[8px]">{blogTitle}</h3>

            <p className="text-[#454955] font-Inter font-normal tab:text-[13px] tab:leading-[18px] tab:tracking-[-0.08px] mt-[8px] line-clamp-3">
                {description}
            </p>
            
            <div className="w-[100%] flex flex-row justify-end mt-[12px]">
                <h3 className="text-[#454955] font-Inter font-medium xl:text-[13px] tab:text-[15px] xl:leading-[18px] tab:leading-[20px] xl:tracking-[-0.08px] tab:tracking-[-0.24px] cursor-pointer">Read more</h3>
            </div>
        </article>
    );
}
