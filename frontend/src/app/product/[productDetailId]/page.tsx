"use client";

import AnimatedSection from "@/components/shared/animatedSection";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import Characteristic from "@/components/shared/characteristicItem";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import Slider from "react-slick";
import ProductGallery from "./ProductGallery";
import AccordionItem from "./AccordionItem";
import { products } from "@/data/products";
import { useParams } from "next/navigation";

const ProductDetailPage = () => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const product = {
    title: "Еко Хоум",
    price: "11 000 ₴",
    description:
      "М'який диван у скандинавському стилі, ідеальний для відпочинку.",
    images: [
      "/detail-item.png",
      "/detail-big-item.png",
      "/divan.png",
    ],
  };

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Breadcrumbs */}
      <AnimatedSection className="mt-8 flex justify-center">
        <Breadcrumbs />
      </AnimatedSection>

      {/* TOP BLOCK */}
      <AnimatedSection className="mt-12 flex flex-col lg:flex-row gap-12">

        {/* Gallery */}
        <div className="w-full lg:w-2/3">
          <ProductGallery images={product.images} />
        </div>

        {/* INFO */}
        <div className="w-full lg:w-1/3">

          <span className="text-sm text-green-600">
            в наявності
          </span>

          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold">
            {product.title}
          </h1>

          <span className="mt-4 block text-xl sm:text-2xl font-medium">
            {product.price}
          </span>

          <p className="mt-4 text-sm sm:text-base">
            {product.description}
          </p>

          <Button className="mt-8 w-full" variant="black">
            Купити
          </Button>

          <div className="mt-6 flex items-center gap-2 cursor-pointer">
            <Image height={20} width={20} alt="favorite" src="/favorite.svg" />
            <span className="text-sm">Додати в обране</span>
          </div>

          {/* Accordion */}
          <div className="mt-8">
            <AccordionItem title="Умови повернення">
              Ви можете повернути товар протягом 14 днів.
            </AccordionItem>

            <AccordionItem title="Оплата і доставка">
              Доставка здійснюється по всій Україні.
            </AccordionItem>

            <AccordionItem title="Догляд">
              Рекомендується суха чистка.
            </AccordionItem>
          </div>

        </div>
      </AnimatedSection>

      {/* BIG DESCRIPTION */}
      <AnimatedSection className="mt-20 text-base sm:text-lg lg:text-xl text-right max-w-4xl ml-auto">
        Диван виготовлений із міцного дерев’яного каркасу, який забезпечує
        довговічність і стійкість до щоденного використання.
      </AnimatedSection>

      {/* CHARACTERISTICS */}
      <AnimatedSection className="mt-12 space-y-3">
        <Characteristic label="Матеріал" value="Міцний дерев'яний каркас" />
        <Characteristic label="Тип обивки" value="Велюр" />
        <Characteristic label="Функціональність" value="Розкладний" />
      </AnimatedSection>

      {/* BIG SLIDER */}
      <AnimatedSection className="mt-20">
        <Slider {...sliderSettings}>
          {product.images.map((img, index) => (
            <div key={index} className="px-2">
              <div className="relative aspect-[4/3] w-full lg:max-w-[800px] bg-gray-100 mx-auto">
                <Image
                  src={img}
                  alt="product"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </AnimatedSection>

      {/* VIEWED */}
      {/* Viewed */}
<h3 className="mt-20 text-2xl font-semibold uppercase">
  Переглянуті
</h3>

{/* Mobile carousel */}
<div className="mt-8 flex gap-4 overflow-x-auto pb-4 lg:hidden">
  {[1, 2, 3, 4].map((item) => (
    <div
      key={item}
      className="min-w-[160px] flex-shrink-0"
    >
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center group cursor-pointer overflow-hidden rounded-lg">
        <Image
          src="/divan.png"
          alt="product"
          width={180}
          height={240}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <span className="block mt-3 text-sm font-medium">
        Еко Хоум
      </span>

      <span className="block mt-1 text-sm">
        11 000 ₴
      </span>
    </div>
  ))}
</div>

{/* Desktop grid */}
<div className="hidden lg:grid mt-8 mb-20 grid-cols-4 gap-6">
  {[1, 2, 3, 4].map((item) => (
    <div key={item}>
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center group cursor-pointer overflow-hidden rounded-lg">
        <Image
          src="/divan.png"
          alt="product"
          width={250}
          height={170}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <span className="block mt-3 text-base font-medium">
        Еко Хоум
      </span>

      <span className="block mt-1 text-base">
        11 000 ₴
      </span>
    </div>
  ))}
</div>

    </section>
  );
};

export default ProductDetailPage;
