import { Button } from "@/components/ui/button";

export function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

export function extractSubtitles(blogContent) {
    const subtitles = [];
    blogContent.forEach(section => {
        if (section.subTitle) {
            subtitles.push(section.subTitle);
        }
    });
    return subtitles;
}

export function renderDetails(details) {
    let titleCount = 0;

    return details?.map(detail => {
        if (detail.type === 'Title') {
            titleCount++;
            return `<h2 class="night-black font-Inter font-medium text-[13px] tab:text-[15px] leading-[18px] tab:leading-[20px] tracking-[-0.08px] tab:tracking-[-0.24px] mt-[16px] xl:mt-[24px]">${titleCount}. ${detail.detailTitle}</h2>`;
        } else if (detail.type === 'Paragraph') {
            return detail.paragraph.map(text => `<p class="mt-2 tertiary-black font-Inter font-normal text-[13px] tab:text-[15px] leading-[18px] tab:leading-[25px] tracking-[-0.08px] tab:tracking-[-0.24px]">${text}</p>`).join('');
        } else if (detail.type === 'Image') {
            // Determine the grid column classes based on the number of images
            const imagesLength = detail.images.length;
            let gridClass = 'grid-rows-1 tab:grid-cols-1';
            if (imagesLength === 2) {
                gridClass = 'grid-rows-2 tab:grid-rows-1 tab:grid-cols-2 gap-y-3 tab:gap-y-0';
            } else if (imagesLength === 3) {
                gridClass = 'grid-rows-3 tab:grid-rows-1 tab:grid-cols-3 gap-y-3 tab:gap-y-0';
            }

            return `<div class="mt-4 grid ${gridClass} gap-x-[16px]">${detail.images.map(image => 
                `<img class="w-[100%] h-[100%]" src="${image.url}" alt="${image.credit}" />`
            ).join('')} ${detail.images[0].credit ? `<p class="mt-2 tab:mt-3 tertiary-black font-Inter font-normal text-[11px] tab:text-[12px] leading-[13px] tab:leading-[16px]">Credit: ${detail.images[0].credit}</p>` : ''}</div>`;
        } else if (detail.type === 'ExternalLink') {
            return `<Button variant="link" class="flex flex-row w-[100%] items-center justify-between border border-[#E9E9E9] rounded-[8px] mt-[12px]">
                <div class="w-[76%] tab:w-[90%] h-[100%] pl-[24px] py-3 flex flex-row items-center justify-start" >
                    <a href="${detail.link}" target="_blank" class="tertiary-black font-Syne font-semibold text-[13px] tab:text-[15px] leading-[13px] tab:leading-[18px] tracking-[0.07px] tab:tracking-[-0.08px]">${detail.text}</a>
                </div>
                <div class="w-[24%] tab:w-[10%] h-[100%] pr-[12px] tab:pr-[32px] py-3 justify-end flex-row flex" >
                    <p class="secondary-text font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px]" >View</p>
                </div>
            </Button>`
        }

    }).join('');
}


export const getCookie = (name) =>  {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export const removeCookie = (name) =>  {
    document.cookie = `${name}=; max-age=0; path=/;`;
}