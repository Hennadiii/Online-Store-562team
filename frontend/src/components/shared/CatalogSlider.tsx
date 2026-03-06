"use client";

import CustomSlider from "@/components/shared/customSlider";
import ProductCard from "@/components/shared/ProductCard";
import type { ProductDto } from "@/types/product";

interface Props {
  products: ProductDto[];
}

const CatalogSlider: React.FC<Props> = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-gray-400 text-sm">Товари відсутні</p>;
  }

  return (
    <CustomSlider slidesToShow={4.25}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </CustomSlider>
  );
};

export default CatalogSlider;