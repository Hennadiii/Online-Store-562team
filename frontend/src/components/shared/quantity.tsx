import { useState } from 'react';

const Quantity: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="flex items-center gap-x-1">
      <button
        disabled={quantity === 1}
        onClick={() => setQuantity((prev) => prev - 1)}
        className="rounded-[5px] border-2 px-[31px] py-[11px] text-[36px] transition-colors hover:bg-main hover:text-white disabled:text-[#bfbaba] disabled:hover:bg-white"
      >
        -
      </button>
      <span className="w-[50px] text-center text-[36px]">{quantity}</span>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="rounded-[5px] border-2 px-[27px] py-[12px] text-[36px] transition-colors hover:bg-main hover:text-white"
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
