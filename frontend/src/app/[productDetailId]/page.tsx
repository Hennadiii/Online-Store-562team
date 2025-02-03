"use client";

import Characteristic from "@/components/shared/characteristicItem";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";

const ProductDetailPage = () => {
  // const [index, setIndex] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 2.33,
    slidesToScroll: 2,
    arrows: false,
  };

  // const next = () => sliderRef.current?.slickNext();
  // const previous = () => sliderRef.current?.slickPrev();
  // const beforeChange = (prev: number, next: number) => {
  //   setIndex(Math.floor(next));
  // };

  return (
    <section className="mx-auto h-full max-w-[1440px] overflow-hidden px-80px">
      <Header />
      <ul className="mt-16 flex items-center justify-center gap-x-3">
        {[
          "Головна сторінка",
          "/",
          "Каталог",
          "/",
          "Дивани",
          "/",
          "Еко Хоум",
        ].map((item, index) => (
          <li key={index}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
      <section className="flex gap-x-8">
        <div className="mt-9 w-[952px]">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...settings}
          >
            <div>
              <Image
                width={400}
                height={400}
                className="h-[400px] w-[400px]"
                src="/detail-item.png"
                alt="item"
              />
            </div>
            <div>
              <Image
                width={400}
                height={400}
                className="h-[400px] w-[400px]"
                src="/detail-item.png"
                alt="item"
              />
            </div>
            <div>
              <Image
                width={400}
                height={400}
                className="h-[400px] w-[400px]"
                src="/detail-item.png"
                alt="item"
              />
            </div>
          </Slider>
        </div>

        <div className="mt-7 w-[296px]">
          <span className="text-[12px] leading-[120%]">в наявності</span>
          <h2 className="mt-6 text-[32px] leading-[120%]">Еко Хоум</h2>
          <span className="mt-4 block text-[28px] leading-[120%]">
            11 000 ₴
          </span>
          <p className="mt-6 leading-[120%]">
            М&apos;який диван у скандинавському стилі, ідеальний для відпочинку
          </p>

          <Button className="mt-14" variant="black">
            Купити
          </Button>

          <div className="mt-8 flex items-center gap-x-2">
            <Image height={24} width={24} alt="favorite" src="favorite.svg" />
            <span>Додати в обране</span>
          </div>

          <div className="mt-8 flex flex-col gap-y-2 border-t-2 border-black pt-2 leading-[120%]">
            <div className="flex cursor-pointer items-start gap-x-4 hover:text-accent">
              Умови повернення <span>+</span>
            </div>
            <div className="flex cursor-pointer items-start gap-x-4 hover:text-accent">
              Оплата і доставка <span>+</span>
            </div>
            <div className="flex cursor-pointer items-start gap-x-4 hover:text-accent">
              Догляд <span>+</span>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-[112px] pl-[128px] pr-3 text-right text-[28px] leading-[120%]">
        Диван виготовлений із міцного дерев’яного каркасу, який забезпечує
        довговічність і стійкість до щоденного використання. Високоякісна
        велюрова обивка додає не лише візуальної привабливості, а й приємних
        тактильних відчуттів. Матеріал легко чиститься, що робить його чудовим
        вибором <br /> для сімей з дітьми чи домашніми улюбленцями.
      </p>

      <div className="mt-[38px] flex flex-col gap-y-3">
        <Characteristic label="Матеріал" value="Міцний дерев'яний каркас" />
        <Characteristic label="Тип обивки" value="Високоякісний велюр" />
        <Characteristic label="Функціональність" value="Розкладний" />
        <Characteristic label="Колір" value="Темно зелений" />
        <Characteristic label="Висота" value="75" />
        <Characteristic label="Ширина" value="190" />
        <Characteristic label="Глибина дивану" value="132" />
        <Characteristic label="Підлокітники" value="Квадратні" />
      </div>

      <div className="mt-[105px] w-full">
        <Slider {...settings}>
          <div>
            <Image
              height={540}
              width={540}
              className="h-[540px] w-[540px]"
              src="/detail-big-item.png"
              alt="product"
            />
          </div>
          <div>
            <Image
              height={540}
              width={540}
              className="h-[540px] w-[540px]"
              src="/detail-big-item.png"
              alt="product"
            />
          </div>
          <div>
            <Image
              height={540}
              width={540}
              className="h-[540px] w-[540px]"
              src="/detail-big-item.png"
              alt="product"
            />
          </div>
        </Slider>
      </div>

      <h3 className="mt-[90px] text-h2 uppercase">Переглянуті</h3>

      <div className="mb-[130px] mt-3 flex gap-x-[51px]">
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
      </div>

      <Footer />
    </section>
  );
};

export default ProductDetailPage;
