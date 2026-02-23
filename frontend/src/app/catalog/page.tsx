"use client";

import AnimatedSection from "@/components/shared/animatedSection";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CatalogItem from "@/components/shared/catalogItem";
import { products } from "@/data/products";
import { useState } from "react";

const categories = ["Дивани", "Ліжка", "Крісла", "Шафи", "Тумби", "Комоди"];

const categoryImages: Record<string, string> = {
  Дивани: "/divan001.jpg",
  Ліжка: "/Classic.jpg",
  Крісла: "/Loft1.jpg",
  Шафи: "/Modern.jpg",
  Тумби: "/Wood.jpg",
  Комоди: "/Oslo.jpg",
};

const CatalogPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (title: string) => {
    setSelected((prev) =>
      prev.includes(title)
        ? prev.filter((c) => c !== title)
        : [...prev, title]
    );
  };

  // Если категории выбраны — показываем товары, иначе — карточки категорий
  const showProducts = selected.length > 0;

  const filteredProducts = products.filter((p) =>
    selected.includes(p.category)
  );

  return (
    <section className="mx-auto h-full overflow-hidden max-w-[1440px] bg-first pb-[32px] px-4 sm:px-6 lg:px-8">

      <AnimatedSection as="h1" className="text-h2 mt-14 text-center uppercase">
        Каталог
      </AnimatedSection>

      <Breadcrumbs className="mt-4" />

      <div className="mt-[65px] flex flex-col lg:flex-row gap-8">

        {/* Фильтр слева */}
        <aside className="w-full lg:w-[200px] flex-shrink-0">
          <h3 className="text-base font-semibold uppercase mb-4">Категорії</h3>
          <ul className="flex flex-row flex-wrap lg:flex-col gap-3">
            {categories.map((cat) => (
              <li key={cat}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className={`text-sm ${selected.includes(cat) ? "font-semibold" : "text-gray-600"}`}>
                    {cat}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="mt-4 text-xs underline text-gray-400 hover:text-black transition"
            >
              Скинути фільтр
            </button>
          )}
        </aside>

        {/* Контент */}
        <AnimatedSection
          threshold={0.01}
          as="div"
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {showProducts ? (
            filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CatalogItem
                  key={product.id}
                  image={product.images[0]}
                  title={product.title}
                  price={`${product.price.toLocaleString("uk-UA")} ₴`}
                  href={`/product/${product.id}`}
                />
              ))
            ) : (
              <p className="col-span-3 text-gray-400">Товари не знайдені</p>
            )
          ) : (
            categories.map((cat) => (
              <CatalogItem
                key={cat}
                image={categoryImages[cat]}
                title={cat}
                href={`/catalog/${cat}`}
              />
            ))
          )}
        </AnimatedSection>

      </div>
    </section>
  );
};

export default CatalogPage;