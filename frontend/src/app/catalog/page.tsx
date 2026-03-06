"use client";

import AnimatedSection from "@/components/shared/animatedSection";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CatalogItem from "@/components/shared/catalogItem";
import Pagination from "@/components/shared/pagination";
import { useState, useMemo, useEffect, useCallback } from "react";
import { getProducts } from "@/services/productService";
import type { ProductDto } from "@/types/product";

const categories = ["Дивани", "Ліжка", "Крісла", "Шафи", "Тумби", "Комоди"];

const categoryImages: Record<string, string> = {
  Дивани: "/divan001.jpg",
  Ліжка: "/Classic.jpg",
  Крісла: "/Loft1.jpg",
  Шафи: "/Modern.jpg",
  Тумби: "/Wood.jpg",
  Комоди: "/Oslo.jpg",
};

const ITEMS_PER_PAGE = 6;

const CatalogPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const showProducts = selected.length > 0;
  const showPriceFilter = selected.length === 1;

  const absoluteMin = useMemo(
    () => (products.length ? Math.min(...products.map((p) => p.price)) : 0),
    [products]
  );
  const absoluteMax = useMemo(
    () => (products.length ? Math.max(...products.map((p) => p.price)) : 0),
    [products]
  );

  const fetchProducts = useCallback(async () => {
    if (!showProducts) return;
    setLoading(true);
    try {
      const res = await getProducts({
        filter: {
          category: selected.length === 1 ? selected[0] : undefined,
          minPrice: showPriceFilter && priceMin > 0 ? priceMin : undefined,
          maxPrice: showPriceFilter && priceMax > 0 ? priceMax : undefined,
        },
        page: currentPage - 1,
        pageSize: ITEMS_PER_PAGE,
      });

      const filtered =
        selected.length > 1
          ? res.content.filter((p) => selected.includes(p.category))
          : res.content;

      setProducts(filtered);
      if (selected.length === 1 && priceMin === 0 && priceMax === 0) {
        const min = Math.min(...filtered.map((p) => p.price));
        const max = Math.max(...filtered.map((p) => p.price));
        setPriceMin(min);
        setPriceMax(max);
      }
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
    } catch (e) {
      console.error("Помилка завантаження товарів:", e);
    } finally {
      setLoading(false);
    }
  }, [selected, priceMin, priceMax, currentPage, showProducts, showPriceFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleCategory = (title: string) => {
    const next = selected.includes(title)
      ? selected.filter((c) => c !== title)
      : [...selected, title];
    setSelected(next);
    setCurrentPage(1);
    setPriceMin(0);
    setPriceMax(0);
  };

  return (
    <section className="mx-auto  max-w-[1440px] bg-first pb-[32px] px-4 sm:px-6 lg:px-8">
      <AnimatedSection as="h1" className="text-h2 mt-14 text-center uppercase">
        Каталог
      </AnimatedSection>

      <Breadcrumbs className="mt-4" />

      <div className="mt-[65px] flex flex-col lg:flex-row gap-8">
        {/* Фільтр зліва */}
        <aside className="w-full lg:w-[220px] flex-shrink-0">
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
              onClick={() => {
                setSelected([]);
                setPriceMin(0);
                setPriceMax(0);
                setCurrentPage(1);
              }}
              className="mt-4 text-xs underline text-gray-400 hover:text-black transition"
            >
              Скинути фільтр
            </button>
          )}

          {showPriceFilter && products.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-semibold uppercase mb-4">Ціна</h3>
              <div className="flex gap-2 mb-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-500">Від</label>
                  <input
                    type="number"
                    value={priceMin}
                    min={absoluteMin}
                    max={priceMax}
                    onChange={(e) => { setPriceMin(Number(e.target.value)); setCurrentPage(1); }}
                    className="w-full border-b border-black px-1 py-1 text-sm outline-none bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-500">До</label>
                  <input
                    type="number"
                    value={priceMax}
                    min={priceMin}
                    max={absoluteMax}
                    onChange={(e) => { setPriceMax(Number(e.target.value)); setCurrentPage(1); }}
                    className="w-full border-b border-black px-1 py-1 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="relative flex flex-col gap-2">
                <input
                  type="range" min={absoluteMin} max={absoluteMax} value={priceMin}
                  onChange={(e) => { const val = Number(e.target.value); if (val <= priceMax) { setPriceMin(val); setCurrentPage(1); } }}
                  className="w-full accent-black"
                />
                <input
                  type="range" min={absoluteMin} max={absoluteMax} value={priceMax}
                  onChange={(e) => { const val = Number(e.target.value); if (val >= priceMin) { setPriceMax(val); setCurrentPage(1); } }}
                  className="w-full accent-black"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{absoluteMin.toLocaleString("uk-UA")} ₴</span>
                <span>{absoluteMax.toLocaleString("uk-UA")} ₴</span>
              </div>
            </div>
          )}
        </aside>

        {/* Контент */}
        <div className="flex-1">
          {showProducts && showPriceFilter && (
            <p className="text-sm text-gray-500 tracking-wide mb-6">
              Знайдено товарів:{" "}
              <span className="text-black font-medium">{totalElements}</span>
            </p>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-gray-400 text-sm">Завантаження...</span>
            </div>
          ) : (
            <AnimatedSection
              threshold={0.01}
              as="div"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {showProducts ? (
                products.length > 0 ? (
                  products.map((product) => (
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
          )}

          {showProducts && totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;