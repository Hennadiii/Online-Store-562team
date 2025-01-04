import Image from "next/image";

const CheckoutItem = () => {
  return (
    <div className="flex h-[142px] w-full max-w-[547px] gap-x-6">
      <Image width={142} height={142} src="/checkoutItem.png" alt="product" />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <span>Крісло Браун</span>
          <p className="mt-1 text-[12px]">Колір: Коричневий</p>
          <span className="text-[12px]">x2</span>
        </div>

        <span>8 800 ₴</span>
      </div>
    </div>
  );
};

export default CheckoutItem;
