"use client";

import { useState } from "react";
import ReactPaginate from "react-paginate";
import TeamItem from "@/components/about-us/teamItem";
import { teamMembers } from "@/data/team";
import CustomSlider from "@/components/shared/customSlider";

const ITEMS_PER_PAGE = 3;

const TeamList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Десктопная пагинация
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const selectedItems = teamMembers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="mt-10">

      {/* ===================== */}
      {/* 📱 МОБИЛЬНАЯ КАРУСЕЛЬ */}
      {/* ===================== */}
      <div className="block lg:hidden">
        <CustomSlider slidesToShow={1.2}>
          {teamMembers.map((member) => (
            <TeamItem key={member.name} {...member} />
          ))}
        </CustomSlider>
      </div>

      {/* ===================== */}
      {/* 🖥 ДЕСКТОП ВЕРСИЯ */}
      {/* ===================== */}
      <div className="hidden lg:block">

        <div className="grid grid-cols-3 gap-x-[33px] w-full">
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
            pageCount={Math.ceil(teamMembers.length / ITEMS_PER_PAGE)}
          />
        </div>

      </div>
    </div>
  );
};

export default TeamList;
