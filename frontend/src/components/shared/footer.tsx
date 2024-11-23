import { Button } from '../ui/button';
import FacebookIcon from '../../assets/facebook.svg';
import LinkedinIcon from '../../assets/linkedin.svg';
import InstagramIcon from '../../assets/instagram.svg';
import PinterestIcon from '../../assets/painterest.svg';
import WhatsAppIcon from '../../assets/whatsApp.svg';

const Footer = () => {
  return (
    <footer className="mt-[100px]">
      <div className="flex justify-between">
        <div className="mt-[22px] flex flex-col">
          <span className="text-[24px]">cozycorners@gmail.com</span>
          <span className="mt-2 text-[24px]">+380( 011) 621 16 12</span>
          <p className="mt-4 max-w-[170px] text-[12px] leading-[120%]">
            Графік роботи call-центру: з 09:00 до 20:00 <br /> Без вихідних
          </p>

          <nav className="mt-[64px]">
            <ul className="flex items-center gap-x-2">
              <li>
                <a>
                  <FacebookIcon className="cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <LinkedinIcon className="cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <InstagramIcon className="cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <PinterestIcon className="cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>

              <li>
                <a>
                  <WhatsAppIcon className="cursor-pointer transition-all hover:scale-110" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-x-[64px] text-center leading-[120%]">
          <nav>
            <ul className="flex flex-col gap-y-6">
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Каталог</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Про нас</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Доставка і оплата</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Контакти</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Умови і положення</a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-y-6">
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Гарантія якості</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Партнери</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Договір оферти</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Умови повернення</a>
              </li>
              <li className="hover:text-grey cursor-pointer p-2 transition-colors">
                <a>Політика конфіденційності</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <h6 className="mt-[65px] text-center text-[180px] font-bold leading-[120%]">
        Cozy Corners
      </h6>
      <span className="p ml-6 block pt-4 text-[12px]">2024 ©</span>
    </footer>
  );
};

export default Footer;
