"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";

interface props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartModal: React.FC<props> = ({ isOpen, setIsOpen }) => {
  const { items, removeFromCart, updateQuantity, total } = useCartContext();

  return (
    <section
      onClick={() => setIsOpen(false)}
      className={
        "fixed inset-0 z-50 transform overflow-hidden bg-black/70 ease-in-out " +
        (isOpen
          ? "translate-x-0 opacity-100 transition-opacity duration-500"
          : "translate-x-full opacity-0 transition-all delay-500")
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          "absolute right-0 h-full w-full max-w-[430px] bg-white shadow-xl transition-all duration-500 ease-in-out flex flex-col " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 pt-2 flex-shrink-0">
          <span className="text-[50px] uppercase leading-[120%]">Кошик</span>
          <div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <Image width={32} height={32} src="/close.svg" alt="close" />
          </div>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <span>Ваш кошик порожній</span>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                {/* Image */}
<Link
  href={`/product/${product.id}`}
  onClick={() => setIsOpen(false)}
  className="bg-gray-100 w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center overflow-hidden rounded"
>
  <Image
    src={product.images[0]}
    alt={product.title}
    width={100}
    height={100}
    className="object-contain"
  />
</Link>

{/* Info */}
<div className="flex flex-col flex-1 gap-1">
  <Link
    href={`/product/${product.id}`}
    onClick={() => setIsOpen(false)}
    className="font-medium text-sm hover:underline"
  >
    {product.title}
  </Link>
  <span className="text-sm">
    {product.price.toLocaleString("uk-UA")} ₴
  </span>
                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      disabled={quantity === 1}
                      className="w-7 h-7 border rounded flex items-center justify-center text-lg disabled:opacity-30 hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="text-sm w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 border rounded flex items-center justify-center text-lg hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="self-start text-gray-400 hover:text-red-500 transition text-xl leading-none"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-4 py-6 border-t space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Разом:</span>
              <span>{total.toLocaleString("uk-UA")} ₴</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition"
            >
              Оформити замовлення
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="block w-full border border-black text-center py-3 rounded hover:bg-gray-100 transition"
            >
              Продовжити покупки
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartModal;