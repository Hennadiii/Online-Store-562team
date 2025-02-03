"use client";
import FacebookIcon from "@/assets/facebook.svg";
import LinkedinIcon from "@/assets/linkedin.svg";
import InstagramIcon from "@/assets/instagram.svg";
import PinterestIcon from "@/assets/painterest.svg";
import WhatsAppIcon from "@/assets/whatsApp.svg";
import AnimatedSection from "./animatedSection";

const Footer = () => {
  return (
    <AnimatedSection as="footer" className="mt-[100px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-[24px]">cozycorners@gmail.com</span>
          <span className="mt-2 text-[24px]">+380(11) 621 16 12</span>
          <p className="mt-4 max-w-[280px] text-[20px] leading-[120%]">
            Графік роботи call-центру: з 09:00 до 20:00 <br /> Без вихідних
          </p>

          <nav className="mt-[60px]">
            <ul className="flex items-center gap-x-2">
              <li>
                <a>
                  <FacebookIcon className="h-8 w-8 cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <LinkedinIcon className="h-8 w-8 cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <InstagramIcon className="h-8 w-8 cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <PinterestIcon className="h-8 w-8 cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <WhatsAppIcon className="h-8 w-8 cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-x-[64px] pt-1 text-center leading-[120%]">
          <nav>
            <ul className="flex flex-col gap-y-6">
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Каталог</a>
              </li>
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Про нас</a>
              </li>
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Доставка і оплата</a>
              </li>
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Контакти</a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-y-6">
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Партнери</a>
              </li>
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Договір оферти</a>
              </li>
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Умови повернення</a>
              </li>
              <li className="cursor-pointer p-2 transition-colors hover:text-grey">
                <a>Політика конфіденційності</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <h6 className="mr-5 mt-[140px] text-center text-[180px] font-bold leading-[120%]">
        Cozy Corners
      </h6>
      <span className="p ml-6 block pt-4 text-[12px]">2024 ©</span>
    </AnimatedSection>
  );
};

export default Footer;
