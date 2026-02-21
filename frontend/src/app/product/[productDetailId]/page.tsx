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
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import Link from "next/link";
import { useFavoritesContext } from "@/context/FavoritesContext";

const ProductDetailPage = () => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  dotsClass: "slick-dots custom-dots",
  customPaging: () => (
    <div className="w-3 h-3 rounded-full bg-gray-300 transition-colors duration-300" />
  ),
  };

  const params = useParams();
const id = Number(params.productDetailId);

const product = products.find((p) => p.id === id);
const recentlyViewed = useRecentlyViewed(product); // ← до if-return
if (!product) {
  return <div>Товар не знайдено</div>;
}
const { toggleFavorite, isFavorite } = useFavoritesContext();
const favorited = isFavorite(product.id); 

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
          {product.price.toLocaleString("uk-UA")} ₴

          </span>

          <p className="mt-4 text-sm sm:text-base">
            {product.description}
          </p>

          <Button className="mt-8 w-full" variant="black">
            Купити
          </Button>

          
<div
  onClick={() => toggleFavorite(product)}
  className="mt-6 flex items-center gap-2 cursor-pointer"
>
  <Image
    height={30}
    width={30}
    alt="favorite"
    src={favorited ? "/favorite-active.svg" : "/favorite.svg"}
  />
  <span className="text-sm">
    {favorited ? "В обраному" : "Додати в обране"}
  </span>
</div>

          {/* Accordion */}
          <div className="mt-8">
            <AccordionItem title="Умови повернення">
              Ви можете повернути товар протягом 14 днів з моменту покупки.
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
  {product.fullDescription}
</AnimatedSection>


      {/* CHARACTERISTICS */}
      <AnimatedSection className="mt-12 space-y-3">
      <AnimatedSection className="mt-12 space-y-3">
  <Characteristic
    label="Матеріал"
    value={product.characteristics.material}
  />
  <Characteristic
    label="Тип обивки"
    value={product.characteristics.upholstery}
  />
  <Characteristic
    label="Функціональність"
    value={product.characteristics.functionality}
  />
</AnimatedSection>

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
      {recentlyViewed.length > 0 && (
  <>
    <h3 className="mt-20 text-2xl font-semibold uppercase">
      Переглянуті
    </h3>

    {/* Mobile carousel */}
    <div className="mt-8 flex gap-4 overflow-x-auto pb-4 lg:hidden">
      {recentlyViewed.map((item) => (
        <Link href={`/product/${item.id}`} key={item.id} className="min-w-[160px] flex-shrink-0">
          <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center group cursor-pointer overflow-hidden rounded-lg">
            <Image
              src={item.images[0]}
              alt={item.title}
              width={180}
              height={240}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="block mt-3 text-sm font-medium">{item.title}</span>
          <span className="block mt-1 text-sm">{item.price.toLocaleString("uk-UA")} ₴</span>
        </Link>
      ))}
    </div>

    {/* Desktop grid */}
    <div className="hidden lg:grid mt-8 mb-20 grid-cols-4 gap-6">
      {recentlyViewed.map((item) => (
        <Link href={`/product/${item.id}`} key={item.id}>
          <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center group cursor-pointer overflow-hidden rounded-lg">
            <Image
              src={item.images[0]}
              alt={item.title}
              width={250}
              height={170}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="block mt-3 text-base font-medium">{item.title}</span>
          <span className="block mt-1 text-base">{item.price.toLocaleString("uk-UA")} ₴</span>
        </Link>
      ))}
    </div>
  </>
)}

    </section>
  );
};

export default ProductDetailPage;
