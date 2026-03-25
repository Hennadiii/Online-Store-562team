"use client";

import { cn } from "@/utils/twMerge";
import AnimatedSection from "./animatedSection";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/utils/breadcrumbs";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";

interface BreadcrumbsProps {
  className?: string;
}

interface Breadcrumb {
  label: string;
  link?: string;
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const [items, setItems] = useState<Breadcrumb[]>(getBreadcrumbs(pathname));

  useEffect(() => {
    if (pathname.startsWith("/product/")) return;
    setItems(getBreadcrumbs(pathname));
  }, [pathname]);

  useEffect(() => {
    if (!pathname.startsWith("/product/")) return;

    const id = Number(pathname.split("/")[2]);
    if (isNaN(id)) return;

    getProductById(id)
      .then((product) => {
        setItems([
          { label: "Головна сторінка", link: "/" },
          { label: "Каталог", link: "/catalog" },
          { label: product.category, link: `/catalog/${product.category}` },
          { label: product.title },
        ]);
      })
      .catch(() => {
        setItems(getBreadcrumbs(pathname));
      });
  }, [pathname]);

  return (
    <AnimatedSection
      as="nav"
      className={cn("w-full flex justify-center", className)}
    >
      <div className="w-full max-w-[1200px] px-4">
        <ul className="flex flex-wrap justify-center text-sm text-center leading-snug">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.link ? (
                <Link
                  href={item.link}
                  className="text-grey hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-black font-normal break-words">
                  {item.label}
                </span>
              )}

              {index < items.length - 1 && (
                <span className="mx-2 text-grey">/</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}