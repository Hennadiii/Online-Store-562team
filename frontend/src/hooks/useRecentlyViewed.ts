import { useEffect, useState } from "react";
import { ProductDto } from "@/types/product";

const MAX_ITEMS = 4;
const STORAGE_KEY = "recentlyViewed";

export function useRecentlyViewed(currentProduct?: ProductDto) {
  const [viewed, setViewed] = useState<ProductDto[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: ProductDto[] = stored ? JSON.parse(stored) : [];

    if (currentProduct) {
      const filtered = parsed.filter((p) => p.id !== currentProduct.id);
      const updated = [currentProduct, ...filtered].slice(0, MAX_ITEMS + 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setViewed(updated.filter((p) => p.id !== currentProduct.id).slice(0, MAX_ITEMS));
    } else {
      setViewed(parsed.slice(0, MAX_ITEMS));
    }
  }, [currentProduct?.id]);

  return viewed;
}