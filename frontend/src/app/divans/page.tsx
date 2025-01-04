"use client";
import Filters from "@/components/shared/filters";
import Header from "@/components/shared/header";
import Image from "next/image";

const Divans = () => {
  return (
    <section className="bg-first mx-auto h-[100%] max-w-[1440px] overflow-hidden px-80px pb-[32px]">
      <Header />

      <h1 className="mt-[64px] text-center text-[64px] uppercase leading-[120%]">
        ДИВАНИ
      </h1>

      <ul className="mt-6 flex items-center justify-center gap-x-3">
        {["Головна сторінка", "/", "Каталог", "/", "Дивани"].map(
          (item, index) => (
            <li key={index}>
              <a>{item}</a>
            </li>
          )
        )}
      </ul>

      <div className="mt-11 flex gap-x-3">
        <Filters />

        <div className="relative h-full w-full">
          <div className="absolute -top-1 right-1 flex cursor-pointer gap-x-3">
            <span className="font-second text-[20px]">Сортувати</span>
            <Image width={20} height={20} src="arrow-down.svg" alt="arrow" />
          </div>
          <div className="mt-9 flex flex-wrap gap-x-[18px] gap-y-[44px] overflow-hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default Divans;
