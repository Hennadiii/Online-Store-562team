import Image from "next/image";

const ProfileOrderItem = () => {
  return (
    <article className="w-[632px] h-[218px]">
      <div className="flex gap-x-3 justify-between">
        <span className="leading-[120%] font-bold">№ 1203322123</span>
        <p className="text-[12px] leading-[120%]">
          22 листопада 2024 р, 12:12:44
        </p>
      </div>
      <div className="flex gap-x-3 justify-between">
        <span className="text-[12px] leading-[120%] mt-1">3000 ₴</span>
        <div className="h-[34px] p-[10px] w-[82px] bg-[#b0debc] flex items-center center justify-between">
          <span className="text-[12px] block text-[#076d21] leading-[120%]">
            Отримано
          </span>
        </div>
      </div>

      <div className="flex gap-x-[14px] mt-4 relative w-full">
        <Image src="/orderItem.png" width={150} height={150} alt="orderItem" />
        <Image src="/orderItem.png" width={150} height={150} alt="orderItem" />
        <span className="absolute bottom-0 right-0 underline cursor-pointer font-semibold">
          Детальніше
        </span>
      </div>
    </article>
  );
};

export default ProfileOrderItem;
