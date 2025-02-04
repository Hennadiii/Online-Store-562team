"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const scrolledPercentage =
        (currentScrollY / (scrollHeight - windowHeight)) * 100;

      if (scrolledPercentage < 20) {
        setShowButton(false); // Скрываем кнопку, если проскролили меньше 30%
      } else if (currentScrollY < lastScrollY) {
        setShowButton(true); // Показываем кнопку, если начали скроллить вверх
      } else {
        setShowButton(false); // Скрываем кнопку, если продолжаем скроллить вниз
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bg-lightGrey bottom-5 right-5 h-[56px] w-[56px] border text-white rounded-[5px] transition-opacity duration-300 ${
        showButton ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <Image
        className="m-auto mt-4"
        width={29}
        height={18}
        alt="arrow"
        src="/arrow-up.svg"
      />
      ;
    </button>
  );
};

export default ScrollUpButton;
