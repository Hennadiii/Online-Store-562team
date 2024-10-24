import { Button } from '../ui/button';
import LogoIcon from '../../assets/logo.svg';
import ArrowTopIcon from '../../assets/arrow-top.svg';

const Footer = () => {
  return (
    <footer className="relative mt-[100px] flex h-[579px] justify-between bg-axcent px-[75px] py-[100px] text-white">
      <div
        onClick={() => window.scrollTo(0, 0)}
        className="group absolute right-[75px] top-[82px] cursor-pointer rounded-[5px] border-2 bg-white px-[12px] py-[16px] transition-all hover:scale-105 hover:bg-axcent"
      >
        <ArrowTopIcon className="group flex items-center justify-center text-axcent transition-colors group-hover:text-white" />
      </div>

      <div>
        <LogoIcon className="text-white" />
        <p className="mt-[31px] max-w-[265px] text-[20px] leading-[120%]">
          Potter ipsum wand elf parchment wingardium. Would will glasses got
          suck.
        </p>
        <h6 className="mt-[31px] text-[24px]">Підпишіться на нас</h6>
        <ul className="mt-[25px] flex items-center gap-x-8">
          <li>
            <a>
              {' '}
              <img src="instagram.svg" />
            </a>
          </li>
          <li>
            <a>
              {' '}
              <img src="facebook.svg" />
            </a>
          </li>
          <li>
            <a>
              {' '}
              <img src="twitter.svg" />
            </a>
          </li>
        </ul>
      </div>

      <ul className="mt-14 flex flex-col gap-y-10 text-[20px]">
        <li className="cursor-pointer hover:text-second">
          <a>Товари</a>
        </li>
        <li className="cursor-pointer hover:text-second">
          <a>Про нас</a>
        </li>
        <li className="cursor-pointer hover:text-second">
          <a>Акції</a>
        </li>
        <li className="cursor-pointer hover:text-second">
          <a>Контакти</a>
        </li>
      </ul>

      <div className="mt-20 flex w-[382px] flex-col gap-y-2 leading-[180%]">
        <h6 className="text-[24px]">ПІдписатися</h6>
        <span className="text-[20px]">Підпишіться на новини</span>
        <input
          className="h-10 rounded-[8px] border-[1px] border-white bg-axcent px-3 focus:outline-none"
          placeholder="Електронна пошта"
        />
        <div className="mt-4 flex items-center justify-center gap-x-8">
          <a className="cursor-pointer text-[20px]">Відмінити</a>
          <Button className="h-11 w-[166px] border-0 bg-white p-3 py-0 text-[20px] text-main">
            Підписатися
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
