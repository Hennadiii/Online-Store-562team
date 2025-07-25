"use client";
import { usePathname } from "next/navigation";
import { adminPageTitles } from "@/utils/adminTitles";
import Image from "next/image";

const AdminTopbar = () => {
  const pathname = usePathname();
  const title = adminPageTitles[pathname] || "";

  return (
    <div className="h-[70px] w-full relative">
      <div className="p-4 float-right flex items-center gap-x-[14px]">
        <Image
          className="rounded-[50%]"
          width={44}
          height={44}
          src="/olena.png"
          alt="user"
        />
        <div className="pr-[10px]">
          <p className="leading-[80%]">Аліна Савченко</p>
          <span className="text-grey text-[12px] leading-[120%]">
            адміністратор
          </span>
        </div>
      </div>

      <h1 className="absolute -bottom-[59px] left-[40px] text-[32px]">
        {title}
      </h1>
    </div>
  );
};

export default AdminTopbar;
