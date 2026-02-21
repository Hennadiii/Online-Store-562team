"use client";

import { useState } from "react";
import CatalogItem from "@/components/shared/catalogItem";
import Pagination from "@/components/shared/pagination";
import { Product } from "@/data/products";

const ITEMS_PER_PAGE = 6;

interface Props {
  products: Product[];
}

const CategoryProducts: React.FC<Props> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="mt-[65px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <CatalogItem
              key={product.id}
              image={product.images[0]}
              title={product.title}
              price={`${product.price.toLocaleString("uk-UA")} грн`}
              href={`/product/${product.id}`}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-grey">
            Товари в цій категорії не знайдені.
          </p>
        )}
      </div>

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </>
  );
};

export default CategoryProducts;