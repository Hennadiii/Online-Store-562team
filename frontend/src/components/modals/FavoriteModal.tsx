"use client";

import FavoriteItem from "@/components/profile/favoriteItem";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useCartContext } from "@/context/CartContext";

interface IFavoriteModal {
  showModal: boolean;
  setShowModal: () => void;
}

export default function FavoriteModal({ showModal, setShowModal }: IFavoriteModal) {
  const { favorites, toggleFavorite } = useFavoritesContext();
  const { addToCart, items } = useCartContext();

  const isInCart = (id: number) => items.some((i) => i.product.id === id);

  
  return (
    <div className="bg-white rounded-xl max-w-[min(90vw,640px)] w-full mx-auto max-h-[80vh] overflow-y-auto no-scrollbar">
      <div className="p-5 sm:p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 md:mb-8 text-center">Обране</h2>
       
        {/* Кнопка закрытия — фиксирована над скроллом */}
  <div className="absolute top-4 right-2 z-10">
    <button
      onClick={setShowModal}
      aria-label="Закрити"
      className="group relative w-9 h-9 flex items-center justify-center rounded-full text-white bg-[#3C767E] hover:text-black hover:bg-gray-400 transition duration-300"
    >
      <span className="block text-xl leading-none transition-transform duration-500 group-hover:rotate-90">
        ✕
      </span>
    </button>
  </div>
          

        {favorites.length === 0 ? (
          <p className="text-center text-gray-400">Список обраного порожній</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center items-start">
            {favorites.map((item) => (
              <FavoriteItem
                key={item.id}
                image={item.images[0]}
                title={item.title}
                price={item.price.toLocaleString("uk-UA")}
                onRemove={() => toggleFavorite(item)}
                href={`/product/${item.id}`}
                onClick={setShowModal}
                onAddToCart={() => addToCart(item)}
                inCart={isInCart(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}