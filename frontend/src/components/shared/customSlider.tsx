// components/shared/CustomSlider.tsx
"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import ArrowRight from "@/assets/arrow-right.svg";
import ArrowLeft from "@/assets/arrow-left.svg";

interface CustomSliderProps {
  slidesToShow: number;
  children: React.ReactNode;
}

const CustomSlider = ({ slidesToShow, children }: CustomSliderProps) => {
  const sliderRef = useRef<Slider>(null);
  const [index, setIndex] = useState<number>(0);

  const next = () => sliderRef.current?.slickNext();
  const previous = () => sliderRef.current?.slickPrev();

  const beforeChange = (prev: number, next: number) => {
    setIndex(Math.floor(next));
  };

  const settings = {
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    beforeChange: beforeChange,
  };

  return (
    <div className="relative w-full">
      <ArrowLeft
        onClick={previous}
        className={`absolute right-[165px] top-[-80px] h-6 w-6 transition-transform hover:scale-110 ${
          index === 0 ? "text-grey" : "cursor-pointer"
        }`}
      />
      <ArrowRight
        onClick={next}
        className={`absolute right-2 top-[-80px] h-6 w-6 transition-transform hover:scale-110 ${
          index >= (Array.isArray(children) ? children.length : 1) - 5
            ? "text-grey"
            : "cursor-pointer"
        }`}
      />
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default CustomSlider;
