"use client";

import { useState } from "react";
import CatalogItem from "@/components/shared/catalogItem";
import Pagination from "@/components/shared/pagination";
import { Product } from "@/data/products";

const ITEMS_PER_PAGE = 6;

type SortOption = "default" | "price-asc" | "price-desc";

interface Props {
  products: Product[];
}

const CategoryProducts: React.FC<Props> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const pageCount = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      {/* Сортировка */}
<div className="mt-10 flex justify-end">
  <div className="flex items-center gap-3 text-sm">

    <span className="text-gray-500 tracking-wide">
      Сортування
    </span>

    <div className="relative">
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value as SortOption);
          setCurrentPage(1);
        }}
        className="
          appearance-none
          bg-transparent
          border-b border-gray-300
          px-2 pr-6 py-1
          text-gray-800
          focus:border-black
          outline-none
          transition
          cursor-pointer
        "
      >
        <option value="default">За замовчуванням</option>
        <option value="price-asc">Ціна: від низької до високої</option>
        <option value="price-desc">Ціна: від високої до низької</option>
      </select>

      {/* Стрелка */}
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-500">
        ▼
      </span>
    </div>

  </div>
</div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <CatalogItem
              key={product.id}
              image={product.images[0]}
              title={product.title}
              price={`${product.price.toLocaleString("uk-UA")} ₴`}
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
    currentPage={currentPage}
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