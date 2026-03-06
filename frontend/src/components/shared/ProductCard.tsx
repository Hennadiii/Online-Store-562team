import Image from "next/image";
import Link from "next/link";
import { ProductDto } from "@/types/product";

interface Props {
  product: ProductDto;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="w-full block">
      <div className="bg-[#f1f1f1] h-[200px] sm:h-[250px] flex items-center justify-center group cursor-pointer overflow-hidden">
        <Image
          src={product.images[0] || "/Oslo.jpg"}
          alt={product.title}
          width={262}
          height={170}
          className="group-hover:scale-105 duration-300"
        />
      </div>

      <span className="text-[16px] sm:text-[20px] mt-2 block leading-[120%]">
        {product.title}
      </span>

      <span className="text-[16px] sm:text-[20px] block mt-1 font-semibold">
        {product.price.toLocaleString("uk-UA")} ₴
      </span>
    </Link>
  );
};

export default ProductCard;