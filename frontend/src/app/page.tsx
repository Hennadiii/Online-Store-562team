"use client";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import BedArrow from "@/assets/bed-arrow.svg";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import ArrowLeft from "@/assets/arrow-left.svg";
import useInView from "@/hooks/useVisible";
import { cn } from "@/utils/twMerge";

const tabs = [
  "Дивани",
  "/",
  "Ліжка",
  "/",
  "Крісла",
  "/",
  "Шафи",
  "/",
  "Тумби",
  "/",
  "Комоди",
];

const data = [
  "Дивани",
  "Ліжка",
  "Тумби",
  "Крісла",
  "Комоди",
  "Дивани",
  "Дивани2",
  "Дивани3",
  "Дивани4",
];

const HomePage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const next = () => sliderRef?.current?.slickNext();
  const previous = () => sliderRef?.current?.slickPrev();
  const [isVisible1, ref1] = useInView();
  const [isVisible2, ref2] = useInView();
  const [isVisible3, ref3] = useInView();
  const [isVisible4, ref4] = useInView();
  const [isVisible5, ref5] = useInView();

  const beforeChange = (prev: number, next: number) => {
    setIndex(Math.floor(next));
  };
  const settings = {
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 4.25,
    className: "",
    slidesToScroll: 1,
    arrows: false,
    beforeChange: beforeChange,
  };

  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-x-hidden px-80px pb-[32px]">
      <Header />

      {/* content top */}
      <section
        className={cn("duration-500 ease-in transition-opacity", {
          "opacity-0": true,
          "opacity-100": isVisible1,
        })}
        ref={ref1}
      >
        <div className="relative h-fit">
          <h1 className="mt-1 text-[200px] font-bold">Cozy</h1>
          <h1 className="text-right text-[200px] font-bold leading-[20%]">
            Corners
          </h1>
          <p className="absolute right-[163px] top-[134px] max-w-[350px] text-right font-second text-[24px] leading-[120%]">
            пропонує меблі, які перетворюють спальню на простір затишку та
            гармонії
          </p>
        </div>

        <div className="relative mt-[90px] flex h-[481px] w-[1280px] flex-col items-center justify-center gap-y-[10px] bg-home pt-[235px]">
          <Button>Каталог</Button>
          <Button variant="second">Консультація</Button>
          <div className="group absolute z-20 bottom-[54px] right-[134px] cursor-pointer">
            <span className="truncate ml-[33px] text-[12px] text-white transition-transform group-hover:scale-110">
              Ліжко Вівіана
            </span>
            <BedArrow className="text-[#948d80] h-[17px] w-[118px] transition-all group-hover:scale-110 group-hover:text-white" />
          </div>
        </div>
      </section>

      {/* catalog */}
      <section
        ref={ref2}
        className={cn("mt-[95px] duration-500 ease-in transition-opacity", {
          "opacity-0": true,
          "opacity-100": isVisible2,
        })}
      >
        <h1 className="mb-[15px] text-h2">КАТАЛОГ</h1>
        <div className="h-[350px] w-full relative">
          <ArrowLeft
            onClick={previous}
            className={`absolute right-[165px] top-[-80px] h-6 w-6 transition-transform hover:scale-110 ${
              index === 0 ? "text-grey" : "cursor-pointer"
            } `}
          />

          <ArrowRight
            onClick={next}
            className={`absolute right-2 top-[-80px] h-6 w-6 transition-transform hover:scale-110 ${
              index >= data.length - 5 ? "text-grey" : "cursor-pointer"
            } `}
          />
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...settings}
          >
            {data.map((item, index) => (
              <div className="h-full w-full" key={index}>
                <div className="bg-[#f1f1f1] h-[316px] w-[282px] flex items-center justify-center group cursor-pointer">
                  <Image
                    className="group-hover:scale-105 duration-500"
                    src="/divan.png"
                    alt="product"
                    width={262}
                    height={170}
                  />
                </div>
                <span className="text-[20px] mt-2 block leading-[120%]">
                  {item}
                </span>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Popular */}
      <section
        ref={ref3}
        className={cn("mt-[90px] transition-opacity duration-500 ease-in", {
          "opacity-0": true,
          "opacity-100": isVisible3,
        })}
      >
        <div className="relative">
          <h2 className="text-h2 uppercase">Популярне</h2>
          <ul className="mt-[18px] flex items-center gap-x-[4.5px]">
            {tabs.map((item, index) => (
              <li key={index} className="p-2">
                <a>{item}</a>
              </li>
            ))}
          </ul>
          <Button className="absolute right-[10px] top-[54px] border-black">
            Каталог
          </Button>
        </div>

        <div className="mt-[45px] flex flex-wrap justify-between gap-y-[30px]">
          {/* first row */}
          <div className="flex gap-x-[34px]">
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-1.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-2.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
          </div>
          {/* second row */}
          <div className="flex gap-x-[52px]">
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
          </div>

          {/* third row */}
          <div className="flex gap-x-[34px]">
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-1.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-2.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact us */}
      <section
        ref={ref4}
        className={cn(
          "mt-[90px] flex justify-between gap-x-9 duration-500 transition-opacity ease-in",
          {
            "opacity-0": true,
            "opacity-100": isVisible4,
          }
        )}
      >
        <div className="max-w-[624px]">
          <p className="text-justify text-[50px] font-medium uppercase leading-[119%]">
            Створіть <span className="font-second text-accent">дім</span> своєї
            мрії з нашим дизайнером
          </p>

          <p className="mt-3 text-center text-[20px] leading-[120%]">
            Не знаєте, як обрати меблі для вашого простору? Залиште email, і наш
            дизайнер допоможе створити стильний та комфортний інтер’єр.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for submit our form, we will contact you soon...");
            }}
            className="mt-[105px]"
          >
            <input
              type="email"
              required
              className="h-[40px] w-full border-b-[1px] px-2 focus:outline-none"
              placeholder="Email"
            />

            <Button type="submit" className="mt-12 w-full" variant="black">
              Відправити
            </Button>
          </form>

          <p className="mt-[22px] ml-1 leading-[120%]">
            Ваша інформація буде збережена в обліковому записі магазину.
            Продовжуючи, ви погоджуєтеся з
            <a className="cursor-pointer underline ml-1">
              Політикою конфіденційності.
            </a>
          </p>
        </div>
        <div>
          <Image
            src="/homeDesign.png"
            width={620}
            height={594}
            alt="contact us"
          />
        </div>
      </section>

      {/* About Us */}
      <section
        ref={ref5}
        className={cn("mt-[22px] duration-500 transition-opacity ease-in", {
          "opacity-0": true,
          "opacity-100": isVisible5,
        })}
      >
        <h3 className="text-h2">ПРО НАС</h3>

        <div className="mt-5 flex gap-x-9">
          <Image src="/about-us.png" width={620} height={620} alt="about-us" />

          <div>
            <div className="text-[80px] font-medium uppercase leading-[120%]">
              <h4>Наповни</h4>
              <h5 className="float-right mr-[125px] font-second font-medium lowercase text-accent">
                дім
              </h5>
              <h5 className="ml-[90px]">гармонією</h5>
            </div>
            <p className="mt-[130px] text-[20px] font-medium uppercase leading-[120%]">
              Ми пропонуємо широкий вибір меблів для спальні, включаючи більше
              1000 найменувань продукції, що поєднує стиль, комфорт і якість.
            </p>

            <p className="mt-6 text-[20px] leading-[120%]">
              У нашому асортименті — меблі від найкращих виробників, які
              задовольнять найвибагливіші смаки.
            </p>

            <Button className="mt-8 w-full border-black">Більше про нас</Button>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default HomePage;
