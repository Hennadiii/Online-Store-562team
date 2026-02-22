import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface props {
  image: string;
  title: string;
  price?: string;
  onRemove?: () => void;
  href?: string;
  onClick?: () => void;
  onAddToCart?: (e: React.MouseEvent) => void;
  inCart?: boolean;
}

const FavoriteItem: React.FC<props> = ({ image, title, price, onRemove, href, onClick, onAddToCart, inCart }) => {
  const content = (
    <div className="flex flex-col w-full max-w-[295px]">
      <div className="relative bg-[#f1f1f1] h-[199px] w-full flex items-center justify-center cursor-pointer group overflow-hidden">
        <Image
          className="group-hover:scale-105 duration-300 object-contain"
          src={image}
          width={286}
          height={93}
          alt="product"
        />
        {onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition"
          >
            <span className="text-gray-500 hover:text-red-500 text-lg leading-none">✕</span>
          </button>
        )}
      </div>
      <span className="block text-[20px] mt-3 truncate">{title}</span>
      <span className="block text-[20px] mt-1">
        {price} {price && "₴"}
      </span>
      {inCart ? (
  <div
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    className="mt-4 w-full h-[56px] flex items-center justify-center text-center leading-none text-[20px] border border-grey bg-hite text-grey cursor-default select-none"
  >
    Товар у кошику
  </div>
) : (
  <Button
    className="mt-4 w-full h-[56px] px-8 uppercase text-[20px] bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-300"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart?.(e);
    }}
  >
    Купити
  </Button>
)}
    </div>
  );

  return href ? (
    <Link href={href} onClick={onClick}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default FavoriteItem;