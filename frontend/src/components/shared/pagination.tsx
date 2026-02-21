"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";

interface props {
  containerClassName?: string;
  pageRangeDisplayed?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<props> = ({
  containerClassName = "mt-20 flex gap-x-6 text-[20px]",
  pageRangeDisplayed = 5,
  pageCount = 4,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Вперед"
      nextClassName="ml-auto"
      previousLabel="Назад"
      previousClassName="mr-auto"
      containerClassName={containerClassName}
      activeClassName="underline"
      disabledLinkClassName="cursor-default text-grey"
      onPageChange={(e) => {
        const page = e.selected + 1;
        setCurrentPage(page);
        onPageChange?.(page);
      }}
      forcePage={currentPage - 1}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;