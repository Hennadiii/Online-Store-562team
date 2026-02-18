// FavoriteModal.tsx
"use client";

import FavoriteItem from "@/components/profile/favoriteItem";

interface IFavoriteModal {
  showModal: boolean;
  setShowModal: () => void;
}

export default function FavoriteModal({ showModal, setShowModal }: IFavoriteModal) {
  // Можно добавить items: [] позже, пока хардкод
  const items = [
    { id: 1, title: "Космо Делюкс1", price: "10 250" },
    { id: 2, title: "Космо Делюкс2", price: "9 250" },
    { id: 3, title: "Космо Делюкс3", price: "8 250" },
    { id: 4, title: "Космо Делюкс4", price: "7 250" },
  ];

  return (
    <div className="bg-white rounded-xl max-w-[min(90vw,640px)] w-full mx-auto max-h-[80vh] overflow-y-auto">
      {/* Внутренние отступы */}
      <div className="p-5 sm:p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 md:mb-8 text-center">Обране</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {items.map((item) => (
            <FavoriteItem
              key={item.id}
              image="/divan.png"
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}