import { useEffect, useState } from "react";
import { Product } from "@/data/products";

const MAX_ITEMS = 4;
const STORAGE_KEY = "recentlyViewed";

export function useRecentlyViewed(currentProduct?: Product) {
  const [viewed, setViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: Product[] = stored ? JSON.parse(stored) : [];

    if (currentProduct) {
      // Убираем текущий товар если уже есть, добавляем в начало
      const filtered = parsed.filter((p) => p.id !== currentProduct.id);
      const updated = [currentProduct, ...filtered].slice(0, MAX_ITEMS + 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Показываем без текущего товара
      setViewed(updated.filter((p) => p.id !== currentProduct.id).slice(0, MAX_ITEMS));
    } else {
      setViewed(parsed.slice(0, MAX_ITEMS));
    }
  }, [currentProduct?.id]);

  return viewed;
}