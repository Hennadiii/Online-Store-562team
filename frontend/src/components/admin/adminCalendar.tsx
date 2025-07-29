"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/uk";
import { cn } from "@/utils/twMerge";
import Image from "next/image";
import { Button } from "../ui/button";

dayjs.locale("uk");

interface Props {
  open: boolean;
}

const weekdays: string[] = ["Н", "П", "В", "С", "Ч", "П", "С"];

const Calendar: React.FC<Props> = ({ open }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const isSelected = (date: Dayjs): boolean => {
    return selectedDate?.isSame(date, "day") ?? false;
  };

  const isCurrentMonth = (date: Dayjs): boolean => {
    return date.month() === currentDate.month();
  };

  // Построить 6 недель (42 дня) с учетом предыдущего и следующего месяца
  const buildCalendarDays = (): Dayjs[] => {
    const days: Dayjs[] = [];

    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");

    const startDay = startOfMonth.day(); // день недели начала месяца (0 - воскресенье)
    const endDay = endOfMonth.day(); // день недели конца месяца

    // Начальная дата календаря = начало месяца минус лишние дни
    const calendarStart = startOfMonth.subtract(startDay, "day");
    // Конечная дата = конец месяца + дни до субботы
    const calendarEnd = endOfMonth.add(6 - endDay, "day");

    const totalDays = calendarEnd.diff(calendarStart, "day") + 1;

    for (let i = 0; i < totalDays; i++) {
      days.push(calendarStart.add(i, "day"));
    }

    return days;
  };

  const days = buildCalendarDays();

  return (
    <div
      className={cn(
        `absolute duration-200 transition-all easy-in-out p-4 w-80 top-[90px] left-[10%] mx-auto bg-white rounded-[14px] shadow-md overflow-hidden`,
        {
          "scale-[1.03] invisible opacity-0": !open,
          "scale-100 visible opacity-100 top-24": open,
        }
      )}
    >
      <div className="flex pb-2 justify-between items-center mb-2">
        <span className="text-lg font-medium">
          {currentDate.format("MMMM YYYY")}
        </span>
        <div className="flex gap-x-2">
          <button
            className="hover:bg-black/25 p-1 duration-200 rounded-full"
            onClick={handlePrevMonth}
          >
            <Image width={24} height={24} src="/arrow-left.svg" alt="left" />
          </button>
          <button
            className="hover:bg-black/25 p-1 duration-200 rounded-full"
            onClick={handleNextMonth}
          >
            <Image
              className="rotate-180"
              width={24}
              height={24}
              src="/arrow-left.svg"
              alt="right"
            />
          </button>
        </div>
      </div>

      <hr />

      <div className="grid grid-cols-7 text-center text-gray-500 mb-2 mt-4">
        {weekdays.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((date, i) => (
          <div
            key={i}
            className={cn(
              `h-10 flex items-center justify-center rounded-full cursor-pointer text-sm`,
              isSelected(date) && "bg-teal-600 text-white",
              !isCurrentMonth(date) && "text-gray-400",
              isCurrentMonth(date) && "hover:bg-gray-200"
            )}
            onClick={() => setSelectedDate(date)}
          >
            {date.date()}
          </div>
        ))}
      </div>

      <hr className="mt-2" />

      <div className="mt-4 text-[12px] text-gray-500">
        *Ви можете вибрати кілька дат
      </div>

      <Button className="mt-2 h-10 w-[95%] mx-auto" variant="black">
        ЗНАЙТИ
      </Button>
    </div>
  );
};

export default Calendar;
