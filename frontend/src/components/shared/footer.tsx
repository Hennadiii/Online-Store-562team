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
      className="w-full max-w-[1440px] mx-auto px-4 lg:px-20 py-10 lg:py-20 overflow-hidden"
    >
      {/* Контакты и соцсети */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
        <div className="flex flex-col gap-4 lg:gap-6">
          <span className="text-[18px] lg:text-[24px]">cozycorners@gmail.com</span>
          <span className="text-[18px] lg:text-[24px]">+38 (011) 621 16 12</span>
          <p className="text-[14px] lg:text-[20px] max-w-[280px] leading-[120%]">
            Графік роботи call-центру: з 09:00 до 20:00 <br /> Без вихідних
          </p>

          {/* Соцсети */}
          <nav className="mt-4 lg:mt-6">
            <ul className="flex gap-2 lg:gap-4 flex-wrap">
              {socialLinks.map(({ href, src, alt }) => (
                <li key={alt}>
                  <a href={href} aria-label={alt} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={src}
                      alt={alt}
                      width={32}
                      height={32}
                      className="h-8 w-8 cursor-pointer transition-transform hover:scale-110"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Навигация */}
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-x-20">
          <nav>
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-x-6">
              {menuLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="p-1 lg:p-2 cursor-pointer hover:text-grey">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-x-6">
              {policyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="p-1 lg:p-2 cursor-pointer hover:text-grey">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Логотип большой (только для десктопа) */}
      <h6 className="hidden lg:block text-center text-[180px] font-bold leading-[120%] mt-10">
        Cozy Corners
      </h6>

      {/* Маленький копирайт */}
      <span className="block text-center text-[12px] mt-4">
  2024-{new Date().getFullYear()} ©
</span>

    </AnimatedSection>
  );
};

export default Footer;
