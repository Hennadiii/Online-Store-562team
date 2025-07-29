"use client";
import { cn } from "@/utils/twMerge";
import { Button } from "../ui/button";
import { useState } from "react";

const STATUS_OPTIONS = ["Нове", "Прийнято", "Отримано", "Повернено"];

const AdminStatusFilter: React.FC<{ open: boolean }> = ({ open }) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div
      className={cn(
        "absolute duration-200 transition-all ease-in-out top-[90px] left-[10%] rounded-[26px] w-80 pb-6 bg-white border shadow-md",
        {
          "scale-[1.03] invisible opacity-0": !open,
          "scale-100 visible opacity-100 top-24": open,
        }
      )}
    >
      <p className="text-[20px] p-4">Виберіть статус</p>
      <hr />

      <div className="flex flex-wrap p-4 gap-2">
        {STATUS_OPTIONS.map((item) => {
          const isSelected = selectedStatuses.includes(item);
          return (
            <div
              key={item}
              className={cn(
                "cursor-pointer px-3 py-2 rounded-[14px] border text-[12px] transition",
                {
                  "bg-accent text-white border-accent/50": isSelected,
                  "hover:bg-gray-100": !isSelected,
                }
              )}
              onClick={() => toggleStatus(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      <hr />

      <p className="text-[12px] text-accent pl-4 mt-2">
        *Ви можете вибрати кілька статусів
      </p>

      <div className="px-4 pt-2">
        <Button variant="black" className="h-10 w-[95%] mx-auto">
          ЗНАЙТИ
        </Button>
      </div>
    </div>
  );
};

export default AdminStatusFilter;
