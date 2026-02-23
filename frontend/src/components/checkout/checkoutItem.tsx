import Image from "next/image";

interface Props {
  image: string;
  title: string;
  quantity: number;
  price: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CheckoutItem: React.FC<Props> = ({
  image,
  title,
  quantity,
  price,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex w-full gap-x-4 items-center">
      <div className="w-[100px] h-[100px] flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
        <Image
          width={100}
          height={100}
          src={image}
          alt={title}
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-sm text-gray-500">
            {price.toLocaleString("uk-UA")} ₴ / шт
          </span>

          {/* Quantity controls */}
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={onDecrease}
              disabled={quantity === 1}
              className="w-7 h-7 border rounded flex items-center justify-center text-lg disabled:opacity-30 hover:bg-gray-100 transition"
            >
              −
            </button>
            <span className="text-sm w-4 text-center">{quantity}</span>
            <button
              onClick={onIncrease}
              className="w-7 h-7 border rounded flex items-center justify-center text-lg hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="font-medium">
            {(price * quantity).toLocaleString("uk-UA")} ₴
          </span>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition text-xl leading-none"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;