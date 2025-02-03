import Image from "next/image";

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

const CatalogItem: React.FC<props> = ({
  image,
  title,
  price,
  containerHeight = "h-[467px]",
  containerWidth = "w-[624px]",
  imageHeight = 267,
  imageWidth = 268,
  bgColorHeight = "h-[403px]",
}) => {
  return (
    <div className={`${containerHeight} ${containerWidth}`}>
      <div
        className={`bg-[#f1f1f1] ${bgColorHeight} flex items-center justify-center cursor-pointer group`}
      >
        <Image
          className="group-hover:scale-105 duration-300"
          src={image}
          width={imageWidth}
          height={imageHeight}
          alt="product"
        />
      </div>
      <span className="block text-[20px] mt-1">{title}</span>
      <span className="block text-[20px] mt-1">
        {price} {price && "₴"}
      </span>
    </div>
  );
};

export default CatalogItem;
