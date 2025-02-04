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
    <AnimatedSection as="footer" className="mt-[100px]">
      <div className="flex justify-between">
        {/* Контактная информация */}
        <div className="flex flex-col">
          <span className="text-[24px]">cozycorners@gmail.com</span>
          <span className="mt-2 text-[24px]">+380(11) 621 16 12</span>
          <p className="mt-4 max-w-[280px] text-[20px] leading-[120%]">
            Графік роботи call-центру: з 09:00 до 20:00 <br /> Без вихідних
          </p>

          {/* Соцсети */}
          <nav className="mt-[60px]">
            <ul className="flex items-center gap-x-2">
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
                      width={32}
                      height={32}
                      className="h-8 w-8 cursor-pointer transition-all hover:scale-110"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Навигация */}
        <div className="flex items-center gap-x-[64px] pt-1 text-center leading-[120%]">
          <nav>
            <ul className="flex flex-col gap-y-6">
              {menuLinks.map(({ href, label }) => (
                <li
                  key={href}
                  className="cursor-pointer transition-colors hover:text-grey"
                >
                  <Link className="p-2" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-col gap-y-6 mb-11">
              {policyLinks.map(({ href, label }) => (
                <li
                  key={href}
                  className="cursor-pointer transition-colors hover:text-grey"
                >
                  <Link className="p-2" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Логотип */}
      <h6 className="mr-5 mt-[140px] text-center text-[180px] font-bold leading-[120%]">
        Cozy Corners
      </h6>
      <span className="ml-6 block pt-4 text-[12px]">2024 ©</span>
    </AnimatedSection>
  );
};

export default Footer;
