import Image from "next/image";
import { Button } from "../ui/button";

interface props {
  image: string;
  title: string;
  price?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: number;
  imageWidth?: number;
  bgColorHeight?: string;
}

const FavoriteItem: React.FC<props> = ({ image, title, price }) => {
  return (
    <div className="">
      <div
        className={`bg-[#f1f1f1] h-[199px] w-[295px] flex items-center justify-center cursor-pointer group`}
      >
        <Image
          className="group-hover:scale-105 duration-300"
          src={image}
          width={286}
          height={93}
          alt="product"
        />
      </div>
      <span className="block text-[20px] mt-1">{title}</span>
      <span className="block text-[20px] mt-1">
        {price} {price && "₴"}
      </span>
      <Button className="border-black mt-4">Додати в кошик</Button>
    </div>
  );
};

export default FavoriteItem;
