

export default function Blogcard(props) {
    const { id, featuredBlog, blogTitle, minRead, author, date, creditsTo, description, bannerImage } = props
    return(
        <article class="w-[328px] flex flex-col items-start justify-start tab:w-[360px] xl:w-[405px] h-[349px] tab:h-[404px] xl:h-[443px] rounded-[12px] tab:rounded-[16px] p-[8px] tab:p-[12px] xl:p-[16px] border border-[#E9E9E9]">
            <div class="bg-[#C1C2C6] w-[100%] xl:h-[254px] rounded-t-[14px]">
                <img 
                    alt="Blog The Return Journey Cover Picture" 
                    src={bannerImage[0]}
                    width={373}
                    height={254}
                    loading='lazy'
                    format='webp'
                    quality={'low'}
                    class="rounded-t-[14px] h-[100%]"
                    // style="bor: 14px;"
                />
            </div>

            <div class="w-[100%] text-[#454955] flex flex-row items-center justify-between xl:mt-[8px] font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px]">
                <h4>{date}</h4>
                <h4>{minRead}</h4>
            </div>

            <h3 class="text-[#0D0A0B] font-Syne font-semibold text-[17px] leading-[20.4px] tracking-[-0.26px] mt-[8px]">{blogTitle}</h3>

            <p class="text-[#454955] font-Inter font-normal text-[13px] leading-[18px] tracking-[-0.08px] mt-[8px]">{description}</p>
            
            <div class="w-[100%] flex flex-row justify-end mt-[12px]">
                <h3 class="text-[#454955] font-Inter font-medium text-[13px] leading-[18px] tracking-[-0.08px] cursor-pointer">Read more</h3>
            </div>
        </article>
    )
}