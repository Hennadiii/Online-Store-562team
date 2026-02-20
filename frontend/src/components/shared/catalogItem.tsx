import Image from "next/image";
import Link from "next/link";

interface CatalogItemProps {
  image: string;
  title: string;
  price?: string;
  href?: string;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ image, title, price, href }) => {
  const content = (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="block mt-3 text-base font-medium">{title}</span>
      {price && <span className="block mt-1 text-base">{price}</span>}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default CatalogItem;
