"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navTo } from "@/utils/navigations";

const menuLinks = [
  { href: navTo.catalog, label: "Каталог" },
  { href: navTo.aboutUs, label: "Про нас" },
  { href: navTo.deliveryAndPayment, label: "Доставка і оплата" },
  { href: navTo.contacts, label: "Контакти" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-black/10 relative z-50">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-20 h-[70px] flex items-center justify-between">

        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="flex items-center gap-4">

          {/* БУРГЕР (только mobile) */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-[2px] bg-black"></span>
            <span className="w-6 h-[2px] bg-black"></span>
            <span className="w-6 h-[2px] bg-black"></span>
          </button>

          {/* ЛОГО */}
          <Link href="/">
          <Image
  src="/logo.svg"
  alt="Cozy Corners"
  width={111}
  height={76}
  className="cursor-pointer w-[90px] lg:w-[111px] h-auto"
/>

          </Link>
        </div>

        {/* ДЕСКТОП МЕНЮ */}
        <nav className="hidden lg:flex gap-8">
          {menuLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-grey transition">
              {label}
            </Link>
          ))}
        </nav>

        {/* ИКОНКИ (пример) */}
        <div className="flex gap-4">
          <Image src="/search.svg" alt="search" width={20} height={20} />
          <Image src="/user.svg" alt="user" width={20} height={20} />
          <Image src="/favorite.svg" alt="fav" width={20} height={20} />
          <Image src="/cart.svg" alt="cart" width={20} height={20} />
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {open && (
        <>
          {/* Затемнение */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Панель */}
          <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl p-6 flex flex-col gap-8 animate-slideIn">

            {/* Кнопка закрытия */}
            <button
              onClick={() => setOpen(false)}
              className="self-end text-xl"
            >
              ✕
            </button>

            <nav className="flex flex-col gap-6 text-lg">
              {menuLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/10 pb-2"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
