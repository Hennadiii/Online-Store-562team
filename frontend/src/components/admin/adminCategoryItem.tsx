import { cn } from "@/utils/twMerge";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface props {
    name: string
    active: boolean
    setActive: Dispatch<SetStateAction<string>>
}


const CategoryItem: React.FC<props> = ({name, active, setActive}) => {
    return (
        <div onClick={() => setActive(name)}
         className={cn("rounded-[4px] py-1.5 px-2 bg-[#f7f8f9] flex items-center gap-x-3", {
            'bg-accent/25': active
         })}>
            <Image className={cn('transition-all duration-200 easy-out',
            { 'w-fit scale-100': active, 'max-w-0 scale-0': !active })} 
            width={17}
            height={14} 
            src='/admin/active.svg' 
            alt="category" />
            <p className={!active ? 'cursor-pointer' : ''}>{name}</p>
        </div>
    );
}
 
export default CategoryItem;