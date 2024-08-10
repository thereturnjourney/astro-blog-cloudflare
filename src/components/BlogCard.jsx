import { slugify, truncateText } from "../functions/helper"

export default function Blogcard(props) {
    const { id, featuredBlog, blogTitle, minRead, author, date, creditsTo, description, bannerImage } = props
    const truncatedDescription = truncateText(description, 150);

    return(
        <article onClick={()=>window.open(`/details/${id}/${slugify(blogTitle)}`)} className="cursor-pointer flex flex-col items-start justify-start w-[328px] tab:w-[360px] xl:w-[400px] h-[349px] tab:h-[404px] xl:h-[443px] rounded-[12px] tab:rounded-[16px] p-[8px] tab:p-[12px] xl:p-[16px] border border-[#E9E9E9]">
            <div className="w-[100%] h-[178px] tab:h-[215px] xl:h-[224px] rounded-t-[14px]">
                <img 
                    alt="Blog The Return Journey Cover Picture" 
                    src={bannerImage[0]}
                    loading='lazy'
                    className="rounded-t-[14px] h-[100%] w-[100%]"
                />
            </div>

            <div className="w-[100%] text-[#454955] flex flex-row items-center justify-between xl:mt-[8px] font-Inter font-medium tab:text-[13px] tab:leading-[18px] tab:tracking-[-0.08px]">
                <h4>{date}</h4>
                <h4>{minRead}</h4>
            </div>

            <h3 className="text-[#0D0A0B] font-Syne font-semibold tab:text-[17px] tab:leading-[20.4px] tab:tracking-[-0.26px] mt-[8px]">{blogTitle}</h3>

            <p className="text-[#454955] font-Inter font-normal tab:text-[13px] tab:leading-[18px] tab:tracking-[-0.08px] mt-[8px]">{truncatedDescription}</p>
            
            <div className="w-[100%] flex flex-row justify-end mt-[12px]">
                <h3 className="text-[#454955] font-Inter font-medium xl:text-[13px] tab:text-[15px] xl:leading-[18px] tab:leading-[20px] xl:tracking-[-0.08px] tab:tracking-[-0.24px] cursor-pointer">Read more</h3>
            </div>
        </article>
    )
}