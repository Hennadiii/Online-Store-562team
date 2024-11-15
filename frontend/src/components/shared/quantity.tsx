import { useState } from 'react';

const Quantity: React.FC<{ second?: boolean }> = ({ second }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div
      className={`flex items-center gap-x-1 ${second ? 'h-[32px] w-[80px] rounded-[5px] border-[1px] p-2' : ''}`}
    >
      <button
        disabled={quantity === 1}
        onClick={() => setQuantity((prev) => prev - 1)}
        className={`rounded-[5px] ${second ? 'h-fit border-none px-0 py-0 text-[28px] font-thin hover:border-none' : 'border-2 px-[31px] py-[11px] text-[36px] transition-colors hover:bg-main hover:text-white disabled:text-[#bfbaba] disabled:hover:bg-white'}`}
      >
        -
      </button>
      <span
        className={`text-center ${second ? 'h-fit w-[25px] text-[14px]' : 'w-[50px] text-[36px]'} `}
      >
        {quantity}
      </span>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className={`rounded-[5px] ${second ? 'h-fit border-none px-0 py-0 text-[24px] font-thin' : 'border-2 px-[27px] py-[12px] text-[36px] transition-colors hover:bg-main hover:text-white'}`}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
