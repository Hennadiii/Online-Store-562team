"use client";

import CatalogItem from "@/components/shared/catalogItem";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const CatalogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <section className="px-80px mx-auto h-full max-w-[1440px] bg-first pb-[32px]">
      <Header />
      <h1 className="text-h2 mt-14 text-center uppercase">Каталог</h1>

      <nav className="mt-4 flex justify-center">
        <ul className="flex items-center gap-x-5">
          {["Головна сторінка", "/", "Каталог"].map((item, index) => (
            <li key={index}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-[65px] flex flex-wrap gap-x-[32px] gap-y-[30px]">
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Вперед"
        nextClassName="ml-auto"
        previousLabel="Назад"
        previousClassName="mr-auto"
        containerClassName="mt-20 flex gap-x-6 text-[20px]"
        activeClassName="underline"
        disabledLinkClassName="cursor-default text-grey"
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        forcePage={currentPage - 1}
        pageRangeDisplayed={5}
        pageCount={4}
        renderOnZeroPageCount={null}
      />

      <Footer />
    </section>
  );
};

export default CatalogPage;
