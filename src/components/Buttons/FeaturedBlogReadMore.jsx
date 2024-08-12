import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { slugify } from "@/functions/helper";


export default function DrawerButton(props) {
    const { data } = props
    return(
        <Button onClick={()=>window.location.href=`/details/${data.id}/${slugify(data.blogTitle)}`} variant="transparent" >
            <p className="xl:text-[15px] xl:leading-[18px] xl:tracking-[-0.08px]">Read more</p>
            <ArrowRight color='#FFF' weight="bold" size={20} />
        </Button>
    )
}