"use client";
import { cn } from "@/utils/twMerge";
import AnimatedSection from "./animatedSection";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/utils/breadcrumbs";
import Link from "next/link";

interface BreadcrumbsProps {
  className?: string;
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();

  const items = getBreadcrumbs(pathname);

  return (
    <AnimatedSection
      as="nav"
      className={cn("mx-auto flex items-center justify-center", className)}
    >
      <ul className="flex items-center gap-x-3">
        {items?.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <Link className="cursor-pointer text-grey" href={item.link}>
                {item.label}
              </Link>
            ) : (
              <span className={item.label === "/" ? "text-grey" : ""}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
