"use client";

import { cn } from "@/utils/twMerge";
import React, { useEffect, useState, useRef } from "react";

interface props {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

const AnimatedSection: React.FC<props> = ({
  as: Component = "section",
  children,
  threshold = 0.1,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Component
      ref={ref}
      className={cn(
        "opacity-0 translate-y-10 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
        className, // Подключаем кастомные классы
      )}
    >
      {children}
    </Component>
  );
};

export default AnimatedSection;
