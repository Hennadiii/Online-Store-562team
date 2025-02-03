"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import TeamItem from "@/components/shared/teamItem";

interface TeamListProps {
  members: {
    image: string;
    name: string;
    role: string;
    time?: string;
    description?: string;
  }[];
}

const ITEMS_PER_PAGE = 3;

const TeamList: React.FC<TeamListProps> = ({ members }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Фильтруем участников для текущей страницы
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const selectedItems = members.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-3 mt-10 justify-center gap-x-[33px] w-full">
        {selectedItems.map((member) => (
          <TeamItem key={member.name} {...member} />
        ))}
      </div>

      <div className="max-w-[400px] w-full mx-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Вперед"
          previousLabel="Назад"
          previousClassName="mr-16"
          nextClassName="ml-16"
          containerClassName="flex gap-x-6 justify-center mt-9 text-[20px]"
          activeClassName="underline"
          disabledLinkClassName="cursor-default text-grey"
          onPageChange={(e) => setCurrentPage(e.selected)}
          forcePage={currentPage}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(members.length / ITEMS_PER_PAGE)}
        />
      </div>
    </div>
  );
};

export default TeamList;
