import Image from "next/image";

interface props {
  image: string;
  title: string;
}

const CatalogItem: React.FC<props> = ({ image, title }) => {
  return (
    <div className="h-[435px]">
      <div className="bg-[#f1f1f1] w-[624px] h-[403px] flex items-center justify-center cursor-pointer group">
        <Image
          className="group-hover:scale-105 duration-300"
          src={image}
          width={268}
          height={267}
          alt="product"
        />
      </div>
      <span className="block text-[20px] text-center mt-2">{title}</span>
    </div>
  );
};

export default CatalogItem;
