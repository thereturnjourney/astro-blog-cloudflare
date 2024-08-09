import { Button } from "../ui/button";
import { ListBullets } from "@phosphor-icons/react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { extractSubtitles } from "@/functions/helper";



export default function DrawerButton(props) {
    const {section} = props
    const subTitles = extractSubtitles(section)


    return (
        <div className="flex flex-row items-center justify-center w-[100%]">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button 
                        variant="nightBlack" 
                        className="xl:hidden fixed bottom-16 flex flex-row items-center justify-center gap-x-[8px]" 
                    >
                        <ListBullets weight="regular" size={20} /> View Topics
                    </Button>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Topics</DrawerTitle>
                    </DrawerHeader>

                    <div className="w-[100%] flex flex-col items-center justify-start bg-white mt-4 pb-[56px]" >
                        <div class="grid grid-cols-1 px-[20px] mt-[4px] gap-y-3 w-[100%]">
                            {
                                subTitles.map(name=>(
                                    <div class="w-[100%] h-[44px] border border-[#DADDE8] rounded-[8px] flex flex-row items-center justify-start px-[20px]" >{name}</div>
                                ))
                            }
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>


        </div>
    );
}
