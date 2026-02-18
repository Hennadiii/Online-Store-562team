"use client";

import { cn } from "@/utils/twMerge";

interface SearchModalProps {
  showModal: boolean;
  setShowModal: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ showModal, setShowModal }) => {
  return (
    <div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mx-auto p-6 bg-white rounded-xl shadow-xl">
      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Введіть свій запит"
        className={cn(
          "w-full border-b-[1px] border-gray-300 outline-none px-4 py-3 text-base transition-all duration-300 focus:border-accent",
          { "opacity-0": !showModal, "opacity-100": showModal }
        )}
      />

      {/* Кнопка закрытия */}
      <button
        onClick={setShowModal}
        className="absolute top-3 right-3 text-xl text-gray-500 hover:text-accent transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default SearchModal;
