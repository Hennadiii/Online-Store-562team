"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navTo } from "@/utils/navigations";
import FavoriteModal from "../modals/FavoriteModal";
import { disableScroll, enableScroll } from "@/utils/scrollbar";
import LoginForm from "../authForms/loginForm";
import RegisterForm from "../authForms/registrationForm";
import CartModal from "../checkout/cartModal";
import ModalWrapper from "./modalWrapper";
import SearchModal from "../modals/SearchModal";
import SearchIcon from "../../assets/search.svg";
import UserIcon from "../../assets/user.svg";
import FavoriteIcon from "../../assets/favorite.svg";
import CartIcon from "../../assets/cart.svg";
import RestorePasswordForm from "../authForms/restorePasswordForm";
import { useFavoritesContext } from "@/context/FavoritesContext";

const menuLinks = [
  { href: navTo.catalog, label: "Каталог" },
  { href: navTo.aboutUs, label: "Про нас" },
  { href: navTo.deliveryAndPayment, label: "Доставка і оплата" },
  { href: navTo.contacts, label: "Контакти" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowsSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [section, setSection] = useState(1);
  const { favorites } = useFavoritesContext();
  const [showFavorite, setShowFavorite] = useState(false);
  const showSection = () => {
    switch (section) {
      case 1:
        return (
          <LoginForm
            setSection={setSection}
            setShowModal={() => {
              enableScroll();
              setShowModal(false);
            }}
          />
        );
      case 2:
        return (
          <RegisterForm
            setSection={setSection}
            setShowModal={() => {
              enableScroll();
              setShowModal(false);
            }}
          />
        );
        case 3: // 
      return (
        <RestorePasswordForm
          setSection={setSection}
          setShowModal={() => {
            enableScroll();
            setShowModal(false);
          }}
        />
      );
    }
  };

  return (
    <>
      <header className="w-full relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-20 h-[70px] flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex flex-col gap-1"
            >
              <span className="w-6 h-[2px] bg-black"></span>
              <span className="w-6 h-[2px] bg-black"></span>
              <span className="w-6 h-[2px] bg-black"></span>
            </button>

            <Link href={navTo.home}>
              <Image
                src="/logo.svg"
                alt="logo"
                width={111}
                height={76}
                className="cursor-pointer w-[90px] lg:w-[111px] h-auto"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8">
            {menuLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>

          {/* ICONS */}
          <div className="flex gap-6">
            <SearchIcon
              onClick={() => {
                disableScroll();
                setShowsSearch(true);
              }}
              className="cursor-pointer w-6 h-6 hover:scale-110 transition"
            />

            <UserIcon
              onClick={() => {
                disableScroll();
                setShowModal(true);
              }}
              className="cursor-pointer w-6 h-6 hover:scale-110 transition"
            />

<div
  onClick={() => {
    disableScroll();
    setShowFavorite(true);
  }}
  className="cursor-pointer hover:scale-110 transition"
>
  <Image
    src={favorites.length > 0 ? "/favorite-active.svg" : "/favorite.svg"}
    alt="favorite"
    width={24}
    height={24}
  />
</div>


            <CartIcon
              onClick={() => {
                disableScroll();
                setShowCart(true);
              }}
              className="cursor-pointer w-6 h-6 hover:scale-110 transition"
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl p-6 flex flex-col gap-8 z-50 animate-slideIn">

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

      {/* AUTH MODAL */}
      <ModalWrapper
        showModal={showModal}
        setShowModal={() => {
          enableScroll();
          setShowModal(false);
        }}
        center
      >
        {showSection()}
      </ModalWrapper>

      {/* SEARCH MODAL */}
      <ModalWrapper
  showModal={showSearch}
  setShowModal={() => setShowsSearch(false)}
  center={true}
>
  <SearchModal
    showModal={showSearch}
    setShowModal={() => setShowsSearch(false)}
  />
</ModalWrapper>

{/* FAVORITE MODAL */}
<ModalWrapper
  showModal={showFavorite}
  setShowModal={() => {
    enableScroll();
    setShowFavorite(false);
  }}
  center
>
  <FavoriteModal
    showModal={showFavorite}
    setShowModal={() => {
      enableScroll();
      setShowFavorite(false);
    }}
  />
</ModalWrapper>




      {/* CART */}
      <CartModal
        isOpen={showCart}
        setIsOpen={() => {
          enableScroll();
          setShowCart(false);
        }}
      />
    </>
  );
};

export default Header;
