"use client";

import { createContext, useContext, ReactNode } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductDto } from "@/types/product";

interface FavoritesContextType {
  favorites: ProductDto[];
  toggleFavorite: (product: ProductDto) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const value = useFavorites();
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavoritesContext must be used within FavoritesProvider");
  return ctx;
};