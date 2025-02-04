"use client";
import Image from "next/image";

interface props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartModal: React.FC<props> = ({ isOpen, setIsOpen }) => {
  return (
    <section
      onClick={() => setIsOpen(false)}
      className={
        "fixed inset-0 z-50 transform overflow-hidden bg-black/70 bg-opacity-65 ease-in-out " +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500"
          : " translate-x-full opacity-0 transition-all delay-500")
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          "absolute right-0 h-full w-full max-w-[430px] bg-white shadow-xl transition-all duration-500 ease-in-out " +
          (isOpen ? "translate-x-0" : " translate-x-full")
        }
      >
        <div className="flex items-center justify-between">
          <span className="block p-4 text-[50px] uppercase leading-[120%]">
            Кошик
          </span>
          <div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-[50%] p-2 transition-colors duration-500 hover:bg-grey"
          >
            <Image
              width={32}
              height={32}
              src="/close.svg"
              className="h-8 w-8"
              alt="closeIcon"
            />
          </div>
        </div>

        <div className="flex h-full items-center justify-center">
          <span className="mb-[102px] block">Ваш кошик порожній</span>
        </div>
      </div>
    </section>
  );
};

export default CartModal;
