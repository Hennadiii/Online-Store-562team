"use client";

import { cn } from "@/utils/twMerge";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  {
    label: "Мої замовлення",
    subItems: [
      "Усі замовлення",
      "Обробляється",
      "Відправлено",
      "Отримано",
      "Повернено",
    ],
  },
  { label: "Дані облікового запису" },
  { label: "Обране" },
  { label: "Адресна книга" },
  { label: "Вийти", className: "text-red" },
];

const ProfileSidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Мої замовлення");
  const [subSelected, setSubSelected] = useState<string>("Усі замовлення");

  const handleMainItemClick = (label: string) => {
    if (label === "Мої замовлення") {
      setIsExpanded((prev) => !prev);
    }
    setSelected(label);
  };

  const handleSubItemClick = (item: string) => {
    setSelected("Мої замовлення");
    setSubSelected(item);
  };

  return (
    <div>
      <h2 className="text-[20px] leading-[120%]">Мій профіль</h2>

      <ul className="mt-12 flex flex-col gap-y-1">
        {menuItems.map((menuItem) => (
          <li key={menuItem.label}>
            <button
              className={cn("cursor-pointer flex gap-x-1 w-full text-left", {
                "text-grey": selected !== menuItem.label,
                [menuItem.className || ""]: menuItem.className,
              })}
              onClick={() => handleMainItemClick(menuItem.label)}
            >
              {menuItem.label}
              {menuItem.subItems && (
                <Image
                  className={cn("transition-all duration-300", {
                    "rotate-0": !isExpanded,
                    "rotate-180": isExpanded,
                  })}
                  src="/arrow-down.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              )}
            </button>

            {menuItem.subItems && (
              <ul
                className={cn(
                  "pl-4 overflow-hidden transition-all ease-in-out duration-300",
                  {
                    "max-h-0": !isExpanded,
                    "max-h-screen": isExpanded,
                  },
                )}
              >
                {menuItem.subItems.map((subItem) => (
                  <li key={subItem}>
                    <button
                      className={cn("cursor-pointer w-full text-left", {
                        "text-grey": subSelected !== subItem,
                        "text-accent": subSelected === subItem,
                      })}
                      onClick={() => handleSubItemClick(subItem)}
                    >
                      {subItem}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
