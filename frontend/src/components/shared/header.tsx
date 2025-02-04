"use client";
import { disableScroll, enableScroll } from "@/utils/scrollbar";
import { useState } from "react";
import Link from "next/link";
import LoginForm from "../authForms/loginForm";
import RegisterForm from "../authForms/registrationForm";
import CartModal from "../checkout/cartModal";
import ModalWrapper from "./modalWrapper";
import SearchIcon from "../../assets/search.svg";
import UserIcon from "../../assets/user.svg";
import FavoriteIcon from "../../assets/favorite.svg";
import CartIcon from "../../assets/cart.svg";
import Image from "next/image";
import useInView from "@/hooks/useVisible";
import { cn } from "@/utils/twMerge";
import { navTo } from "@/utils/navigations";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearch, setShowsSearch] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [section, setSection] = useState<number>(1);
  const [isVisible, ref] = useInView();

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
    }
  };

  return (
    <header
      ref={ref}
      className={cn(
        "mt-8 flex h-fit items-center justify-between duration-500 transition-opacity  ease-in",
        {
          "opacity-0": true,
          "opacity-100": isVisible,
        },
      )}
    >
      <Link href="/">
        <Image
          className="cursor-pointer"
          width={111}
          height={76}
          src="/logo.svg"
          alt="logo"
        />
      </Link>

      <nav>
        <ul className="flex items-center gap-x-6 ml-14">
          <li className="group cursor-pointer transition duration-300">
            <Link className="p-2" href="/catalog">
              Каталог
            </Link>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer transition duration-300">
            <Link className="p-2" href="/about-us">
              Про нас
            </Link>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer transition duration-300">
            <Link className="p-2" href={navTo.deliveryAndPayment}>
              Доставка і оплата
            </Link>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer transition duration-300">
            <Link className="p-2" href={navTo.contacts}>
              Контакти
            </Link>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
        </ul>
      </nav>

      <div className="relative flex items-center gap-x-6">
        <SearchIcon
          onClick={() => {
            disableScroll();
            setShowsSearch(true);
          }}
          className="z-40 cursor-pointer w-6 h-6 transition-all hover:scale-110 hover:text-accent"
        />
        <UserIcon
          onClick={() => {
            disableScroll();
            setShowModal(true);
          }}
          className="cursor-pointer transition-all w-6 h-6 hover:scale-110 hover:text-accent"
        />
        <FavoriteIcon className="cursor-pointer w-6 h-6 transition-all hover:scale-110 hover:text-accent" />
        <CartIcon
          onClick={() => {
            disableScroll();
            setShowCart(true);
          }}
          className="cursor-pointer transition-all w-6 h-6 hover:scale-110 hover:text-accent"
        />
      </div>

      {/* sign-in & sign-up & forget-password pop up */}
      <ModalWrapper
        showModal={showModal}
        setShowModal={() => {
          enableScroll();
          setShowModal(false);
        }}
        center={true}
      >
        {showSection()}
      </ModalWrapper>

      {/* search popup */}
      <ModalWrapper
        showModal={showSearch}
        setShowModal={() => {
          setShowsSearch(false);
          enableScroll();
        }}
      >
        <div className="float-right mr-[254px] mt-[40px] flex w-[344px] justify-start bg-white p-5">
          <input
            placeholder="Введіть свій запит"
            className={`border-b-[1px] outline-white transition-all focus:outline-none ${
              showSearch ? "w-[280px] px-4" : "w-0"
            } `}
          />
        </div>
      </ModalWrapper>

      {/* cart popup */}
      <CartModal
        isOpen={showCart}
        setIsOpen={() => {
          enableScroll();
          setShowCart(false);
        }}
      />
    </header>
  );
};

export default Header;
