"use client";
import Image from "next/image";
import AnimatedSection from "./animatedSection";
import Link from "next/link";
import { navTo } from "@/utils/navigations";

const socialLinks = [
  { href: "#", src: "/facebook.svg", alt: "Facebook" },
  { href: "#", src: "/linkedin.svg", alt: "LinkedIn" },
  { href: "#", src: "/instagram.svg", alt: "Instagram" },
  { href: "#", src: "/pinterest.svg", alt: "Pinterest" },
  { href: "#", src: "/whatsapp.svg", alt: "WhatsApp" },
];

const menuLinks = [
  { href: navTo.catalog, label: "Каталог" },
  { href: navTo.aboutUs, label: "Про нас" },
  { href: navTo.deliveryAndPayment, label: "Доставка і оплата" },
  { href: navTo.contacts, label: "Контакти" },
];

const policyLinks = [
  { href: navTo.publicOffer, label: "Договір оферти" },
  { href: navTo.returnPolicy, label: "Умови повернення" },
  { href: navTo.privacyPolicy, label: "Політика конфіденційності" },
];

const Footer = () => {
  return (
    <AnimatedSection
      as="footer"
      className="w-full max-w-[1440px] mx-auto px-4 lg:px-20 py-12 lg:py-24 border-t border-gray-200"
    >
      <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
        
        {/* Контакты */}
        <div className="flex flex-col gap-6 lg:min-w-[280px]">
          <div className="flex flex-col gap-2">
            <span className="text-[20px] lg:text-[26px] font tracking-tight">
              cozycorners@gmail.com
            </span>
            <span className="text-[20px] lg:text-[26px] font tracking-tight">
              +38 (011) 621 16 12
            </span>
          </div>

          <p className="text-[14px] lg:text-[18px] text-gray-500 leading-relaxed max-w-[300px]">
            Графік роботи call-центру: <br />
            з 09:00 до 20:00 <br />
            Без вихідних
          </p>

          {/* Соцсети */}
          <nav className="pt-2">
            <ul className="flex gap-3 lg:gap-5">
              {socialLinks.map(({ href, src, alt }) => (
                <li key={alt}>
                  <a
                    href={href}
                    aria-label={alt}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={28}
                      height={28}
                      className="opacity-70 hover:opacity-100 hover:scale-110 transition duration-300"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Навигация */}
        <div className="flex flex-col gap-10 text-left lg:min-w-[340px]">

          <nav>
            <ul className="flex flex-col gap-4">
              {menuLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] lg:text-[16px] text-gray-700 hover:text-black transition duration-200 leading-snug"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-col gap-4">
              {policyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] lg:text-[16px] text-gray-700 hover:text-black transition duration-200 leading-snug"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          

        </div>
      </div>

      {/* Большой логотип */}
      <h6 className="hidden lg:block text-center text-[160px] font-bold tracking-tight text-black mt-16">
        Cozy Corners
      </h6>


      {/* Копирайт */}
      <span className="block text-center text-[13px] text-gray-500 mt-6">
        2024-{new Date().getFullYear()} © 
      </span>
    </AnimatedSection>
  );
};

export default Footer;