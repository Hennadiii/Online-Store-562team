"use client";

import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import type { ProductDto } from "@/types/product";

interface Props {
  products: ProductDto[];
}

const tabs = ["Всі", "Дивани", "Ліжка", "Крісла", "Шафи", "Тумби", "Комоди"];

const PopularSection = ({ products }: Props) => {
  const [activeTab, setActiveTab] = useState("Всі");

  const filteredProducts =
    activeTab === "Всі"
      ? products
      : products.filter((p) =>
          p.title.toLowerCase().includes(activeTab.toLowerCase().slice(0, -1))
        );

  return (
    <>
      <div className="relative">
        <h2 className="text-[50px] sm:text-[52px] md:text-[54px] uppercase mb-4">
          Популярне
        </h2>

        <ul className="flex flex-wrap gap-2 sm:gap-4 mb-4">
          {tabs.map((item, index) => (
            <li key={index} className="p-2">
              <button
                onClick={() => setActiveTab(item)}
                className={`cursor-pointer ${
                  activeTab === item ? "underline font-semibold" : ""
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-4 text-gray-400 text-sm">
            Товари не знайдені
          </p>
        )}
      </div>
    </>
  );
};

export default PopularSection;