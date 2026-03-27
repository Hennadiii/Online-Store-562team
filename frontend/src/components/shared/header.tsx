"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import CartIcon from "../../assets/cart.svg";
import RestorePasswordForm from "../authForms/restorePasswordForm";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { useCartContext } from "@/context/CartContext";
import { useAuthContext, getInitials, getAvatarColor } from "@/context/AuthContext";
import { useOrderContext } from "@/context/OrderContext";

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
  const [showFavorite, setShowFavorite] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { favorites } = useFavoritesContext();
  const { items } = useCartContext();
  const { isAuthenticated, logout, user } = useAuthContext();
  const { showGuestBanner, guestBannerLink } = useOrderContext();

  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const displayText = user?.name || user?.email || "";

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu((prev) => !prev);
    } else {
      setSection(1);
      disableScroll();
      setShowModal(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showSection = () => {
    switch (section) {
      case 1:
        return (
          <LoginForm
            setSection={setSection}
            setShowModal={() => { enableScroll(); setShowModal(false); }}
          />
        );
      case 2:
        return (
          <RegisterForm
            setSection={setSection}
            setShowModal={() => { enableScroll(); setShowModal(false); }}
          />
        );
      case 3:
        return (
          <RestorePasswordForm
            setSection={setSection}
            setShowModal={() => { enableScroll(); setShowModal(false); }}
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
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>

          {/* ICONS */}
          <div className="flex gap-6 items-center">

            <SearchIcon
              onClick={() => { disableScroll(); setShowsSearch(true); }}
              className="cursor-pointer w-6 h-6 hover:scale-110 transition"
            />

            {/* USER + DROPDOWN */}
            <div className="relative" ref={userMenuRef}>
              <div onClick={handleUserClick} className="cursor-pointer">
                {isAuthenticated ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 text-xs font-semibold hover:scale-110 transition"
                    style={{ backgroundColor: getAvatarColor(displayText) }}
                  >
                    {getInitials(user?.name, user?.email)}
                  </div>
                ) : (
                  <UserIcon className="w-6 h-6 hover:scale-110 transition" />
                )}
              </div>

              {/* DROPDOWN авторизованого */}
              {isAuthenticated && showUserMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-black/10 py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => { router.push("/profile"); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Профіль
                  </button>
                  <button
                    onClick={() => { router.push("/profile/orders"); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Мої замовлення
                  </button>
                  <div className="border-t my-2" />
                  <button
                    onClick={async () => {
                      await logout();
                      setShowUserMenu(false);
                      router.push("/");
                      router.refresh();
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition border-t border-gray-100 mt-2"
                  >
                    <span className="text-[15px]">Вийти</span>
                    <img src="/Logout.svg" alt="Logout" className="w-4 h-4 opacity-70" />
                  </button>
                </div>
              )}
            </div>

            {/* FAVORITE */}
            <div
              onClick={() => { disableScroll(); setShowFavorite(true); }}
              className="cursor-pointer hover:scale-110 transition"
            >
              <Image
                src={favorites.length > 0 ? "/favorite-active.svg" : "/favorite.svg"}
                alt="favorite"
                width={24}
                height={24}
              />
            </div>

            {/* CART */}
            <div
              onClick={() => { disableScroll(); setShowCart(true); }}
              className="relative cursor-pointer hover:scale-110 transition"
            >
              <CartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#3C767E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* GUEST ORDER BANNER — показується 30 хв після оформлення */}
        {!isAuthenticated && showGuestBanner && guestBannerLink && (
          <div className="max-w-[1440px] mx-auto px-4 lg:px-20 py-1 flex justify-center">
            <Link
              href={guestBannerLink}
              className="flex items-center gap-1.5 text-[12px] text-[#2e7d32] hover:text-[#1b5e20] transition"
            >
              <svg
                className="w-3.5 h-3.5 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="opacity-80 hover:opacity-100 transition">
                Замовлення оформлено - переглянути
              </span>
            </Link>
          </div>
        )}

        {/* MOBILE MENU */}
        {open && (
          <>
            <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
            <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl p-6 flex flex-col gap-8 z-50 animate-slideIn">
              <button onClick={() => setOpen(false)} className="self-end text-xl">✕</button>
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

              {/* Для гостя — посилання в мобільному меню (теж тільки 30 хв) */}
              {!isAuthenticated && showGuestBanner && guestBannerLink && (
                <Link
                  href={guestBannerLink}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[#2e7d32] underline"
                >
                  Замовлення оформлено — переглянути
                </Link>
              )}

              
            </div>
          </>
        )}
      </header>

      {/* AUTH MODAL */}
      <ModalWrapper
        showModal={showModal}
        setShowModal={() => { enableScroll(); setShowModal(false); setSection(1); }}
        center
      >
        {showSection()}
      </ModalWrapper>

      {/* SEARCH */}
<ModalWrapper
  showModal={showSearch}
  setShowModal={() => {
    enableScroll();
    setShowsSearch(false);
  }}
  center
>
  <SearchModal
    showModal={showSearch}
    setShowModal={() => {
      enableScroll();
      setShowsSearch(false);
    }}
  />
</ModalWrapper>

      {/* FAVORITE */}
      <ModalWrapper
        showModal={showFavorite}
        setShowModal={() => { enableScroll(); setShowFavorite(false); }}
        center
      >
        <FavoriteModal
          showModal={showFavorite}
          setShowModal={() => { enableScroll(); setShowFavorite(false); }}
        />
      </ModalWrapper>

      {/* CART */}
      <CartModal isOpen={showCart} setIsOpen={() => { enableScroll(); setShowCart(false); }} />
    </>
  );
};

export default Header;