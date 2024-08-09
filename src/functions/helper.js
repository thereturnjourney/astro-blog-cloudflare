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

    console.log('details: ', details)

    return details?.map(detail => {
        if (detail.type === 'Title') {
            titleCount++;
            return `<h2 class="night-black font-Inter font-medium text-[13px] tab:text-[15px] leading-[18px] tab:leading-[20px] tracking-[-0.08px] tab:tracking-[-0.24px] mt-[16px] xl:mt-[24px]">${titleCount}. ${detail.detailTitle}</h2>`;
        } else if (detail.type === 'Paragraph') {
            return detail.paragraph.map(text => `<p class="mt-2 tertiary-black font-Inter font-normal text-[13px] tab:text-[15px] leading-[18px] tab:leading-[25px] tracking-[-0.08px] tab:tracking-[-0.24px]">${text}</p>`).join('');
        } else if (detail.type === 'Image') {
            // Determine the grid column classes based on the number of images
            const imagesLength = detail.images.length;
            let gridClass = 'grid-cols-1';
            if (imagesLength === 2) {
                gridClass = 'grid-cols-2';
            } else if (imagesLength >= 3) {
                gridClass = 'grid-cols-3';
            }

            return `<div class="mt-4 grid ${gridClass} gap-x-[16px]">${detail.images.map(image => 
                `<img src="${image.url}" alt="${image.credit}" />`
            ).join('')}<p class="mt-2 tab:mt-3 tertiary-black font-Inter font-normal text-[11px] tab:text-[12px] leading-[13px] tab:leading-[16px]">Credit: ${detail.images[0].credit}</p></div>`;
        } else if (detail.type === 'ExternalLink') {
            return `<Button variant="link" class="flex flex-row w-[100%] items-center justify-between border border-[#E9E9E9] rounded-[8px] mt-[12px]">
                <div class="w-[76%] tab:w-[90%] h-[100%] pl-[24px] py-3 flex flex-row items-center justify-start" >
                    <p class="tertiary-black font-Syne font-semibold text-[13px] tab:text-[15px] leading-[13px] tab:leading-[18px] tracking-[0.07px] tab:tracking-[-0.08px]">${detail.text}</p>
                </div>
                <div class="w-[24%] tab:w-[10%] h-[100%] pr-[12px] tab:pr-[32px] py-3 justify-end flex-row flex" >
                    <p class="secondary-text font-Syne font-semibold text-[15px] leading-[18px] tracking-[-0.08px]" >View</p>
                </div>
            </Button>`
        }

    }).join('');
}

        // else if (detail.type === 'Itinerary'){
        //     return `<div class="w-[100%] mt-3 flex flex-row items-start justify-start" >
        //         <div class="w-[75%] flex flex-row py-[8px] pl-[8px] pr-[40px] gap-x-3 justify-start items-center">
        //             <img src="${image.url}" alt="${image.credit}" />
        //         </div>
        //         <div class="w-[25%] flex flex-col">
        //         </div>
        //     </div>`
        // } 

// function formatDate(dateString) {
//     const months = [
//         'January', 'February', 'March', 'April', 'May', 'June', 
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     // Validate the input format using a regular expression
//     const datePattern = /^\d{4}-\d{2}-\d{2}$/;
//     if (!datePattern.test(dateString)) {
//         throw new Error('Invalid date format. Please use yyyy-mm-dd format.');
//     }

//     const [year, month, day] = dateString.split('-');

//     // Validate the date values
//     const monthIndex = parseInt(month, 10) - 1;
//     if (monthIndex < 0 || monthIndex > 11) {
//         throw new Error('Invalid month value.');
//     }
//     if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
//         throw new Error('Invalid day value.');
//     }

//     const monthName = months[monthIndex];
//     return `${parseInt(day, 10)} ${monthName} ${year}`;
// }
