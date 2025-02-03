"use client";
import CatalogItem from "@/components/shared/catalogItem";
import Filters from "@/components/shared/filters";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Image from "next/image";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const Divans = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
          <div className="mt-9 grid grid-cols-2 gap-x-[26px] gap-y-[44px] overflow-hidden">
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              bgColorHeight="h-[536px]"
              containerHeight="h-[600px]"
              containerWidth="w-[457px]"
              imageHeight={128}
              imageWidth={457}
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Вперед"
            nextClassName="ml-auto"
            previousLabel="Назад"
            previousClassName="mr-auto"
            containerClassName="mt-16 flex gap-x-6 text-[20px]"
            activeClassName="underline"
            disabledLinkClassName="cursor-default text-grey"
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            forcePage={currentPage - 1}
            pageRangeDisplayed={5}
            pageCount={4}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Divans;
