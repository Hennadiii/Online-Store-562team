"use client";

import { useState } from "react";
import clsx from "clsx";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export default function AccordionItem({
  title,
  children,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <span>{title}</span>
        <span
          className={clsx(
            "text-xl transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        >
          +
        </span>
      </button>

      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}
