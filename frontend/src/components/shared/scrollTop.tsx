"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 600;

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY завжди 0 коли скролить html а не body.
      // document.documentElement.scrollTop працює в обох випадках.
      setShowButton(document.documentElement.scrollTop > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bg-lightGrey bottom-5 right-5 h-[56px] w-[56px] border text-white rounded-[5px]
      transition-all duration-300 ease-out will-change-transform
      ${
        showButton
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
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
    </button>
  );
};

export default ScrollUpButton;