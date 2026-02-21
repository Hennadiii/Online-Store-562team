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
}

const FavoriteItem: React.FC<props> = ({ image, title, price, onRemove, href, onClick }) => {
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
              e.stopPropagation(); // ← добавьте
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
      <Button className="border-black mt-4">Додати в кошик</Button>
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