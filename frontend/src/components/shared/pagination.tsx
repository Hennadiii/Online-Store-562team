"use client";
import ReactPaginate from "react-paginate";

interface props {
  containerClassName?: string;
  pageRangeDisplayed?: number;
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<props> = ({
  containerClassName = "mt-20 flex gap-x-6 text-[20px]",
  pageRangeDisplayed = 5,
  pageCount = 4,
  currentPage = 1,
  onPageChange,
}) => {
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
      onPageChange={(e) => onPageChange?.(e.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;