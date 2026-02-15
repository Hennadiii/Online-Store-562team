import Image from "next/image";

interface Props {
  image: string;
  title: string;
  price?: string;
}

const CatalogItem: React.FC<Props> = ({
  image,
  title,
  price,
}) => {
  return (
    <div className="w-full">
      <div className="bg-[#f1f1f1] aspect-square flex items-center justify-center cursor-pointer group overflow-hidden">
        <Image
          className="group-hover:scale-105 duration-300 w-full h-auto object-contain"
          src={image}
          width={500}
          height={500}
          alt="product"
        />
      </div>

      <span className="block text-lg mt-2">{title}</span>

      {price && (
        <span className="block text-lg mt-1">
          {price} ₴
        </span>
      )}
    </div>
  );
};

export default CatalogItem;
