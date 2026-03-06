import { useState, useEffect } from "react";
import { ProductDto } from "@/types/product";

const STORAGE_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<ProductDto[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleFavorite = (product: ProductDto) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      const updated = exists
        ? prev.filter((p) => p.id !== product.id)
        : [product, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.some((p) => p.id === id);

  return { favorites, toggleFavorite, isFavorite };
}