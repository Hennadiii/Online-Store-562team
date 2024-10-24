import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import Quantity from '../components/shared/quantity';
import { Button } from '../components/ui/button';
import ArrowTopIcon from '../assets/arrow-top.svg';
import { useState } from 'react';
import ProductItem from '../components/shared/productItem';

const images = ['divan1.png', 'divan2.png', 'divan3.png'];

const ProductDetailPage: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);

  return (
    <main className="mx-auto h-full max-w-[1440px] bg-first">
      <Header />
      <section className="mt-[100px] px-[75px]">
        <ul className="flex items-center gap-x-1">
          {['Товари', '/', 'Дивани', '/', 'Диван маленький'].map((item) => (
            <li
              className="cursor-pointer text-[15px] font-extralight hover:text-second"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex gap-x-11">
          <div className="mt-[45px]">
            <img
              className="h-[520px] w-[630px]"
              src={images[selected]}
              alt="product"
            />

            <div className="mt-[40px] flex items-center gap-x-5">
              {images.map((item, index) => (
                <img
                  onClick={() => setSelected(index)}
                  className={`h-[185px] w-[196px] rounded-[5px] transition-all ${index === selected ? 'outline outline-offset-[1px]' : 'cursor-pointer hover:scale-[1.03]'} `}
                  key={index}
                  src={item}
                  alt={item}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="mt-8 max-w-[50%] text-[64px] font-bold leading-[120%]">
              Диван маленький
            </h1>

            <h2 className="mt-11 text-[36px]">$1000</h2>

            <div className="mt-11 flex gap-x-6">
              <Quantity />
              <Button className="text-[32px]">До кошика</Button>
            </div>

            <div className="mt-12">
              <div
                onClick={() => setShow((prev) => !prev)}
                className="flex cursor-pointer items-center justify-between"
              >
                <span className="text-[24px] font-bold">Опис</span>
                <ArrowTopIcon
                  className={`h-5 w-5 transition-all delay-75 duration-100 ${show ? 'rotate-180' : 'rotate-0'} `}
                />
              </div>
              <div
                className={`${show ? 'max-h-screen' : 'max-h-0'} mt-2 max-w-[630px] overflow-hidden transition-all duration-500`}
              >
                <p>
                  2-місна софа із тканинною оббивкою. Наповнення подушок сидіння
                  та спинки з піноматеріалу. Електричний механізм плавного
                  нахилу спинки та вбудована підставка для ніг. 138х90 см, вис.
                  83 см
                </p>
              </div>
              <div className="mt-6 flex cursor-pointer items-center justify-between">
                <span className="text-[24px] font-bold">
                  Повернення та доставка
                </span>
                <ArrowTopIcon className="h-5 w-5" />
              </div>
              <p></p>
            </div>
          </div>
        </div>

        <h3 className="mt-[110px] text-[64px] font-bold">Переглянуті</h3>

        <div className="mt-[110px] flex flex-wrap items-center gap-x-[30px] gap-y-[75px]">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>

        <Button
          variant="small"
          className="mx-auto mt-[90px] flex w-[190px] justify-center"
        >
          Load more
        </Button>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetailPage;
