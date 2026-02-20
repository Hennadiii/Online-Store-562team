"use client";

import { cn } from "@/utils/twMerge";
import AnimatedSection from "./animatedSection";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/utils/breadcrumbs";
import { products } from "@/data/products";

interface BreadcrumbsProps {
  className?: string;
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  let items = getBreadcrumbs(pathname);

  // если это страница товара
  if (pathname.startsWith("/product/")) {
    const id = Number(pathname.split("/")[2]);
    const product = products.find((p) => p.id === id);

    if (product) {
      items = [
        { label: "Головна сторінка", link: "/" },
        { label: "/" },
        { label: "Каталог", link: "/catalog" },
        { label: "/" },
        {
          label: product.category,
          link: `/catalog/${product.category}`,
        },
        { label: "/" },
        { label: product.title },
      ];
    }
  }

  return (
    <AnimatedSection
      as="nav"
      className={cn("mx-auto flex items-center justify-center", className)}
    >
      <ul className="flex items-center gap-x-3">
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <Link className="text-grey hover:text-black" href={item.link}>
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
