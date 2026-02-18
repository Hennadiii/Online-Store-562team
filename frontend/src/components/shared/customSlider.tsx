"use client";
import Slider from "react-slick";
import ArrowRight from "@/assets/arrow-right.svg";
import ArrowLeft from "@/assets/arrow-left.svg";
import { useRef } from "react";

interface CustomSliderProps {
  children: React.ReactNode;
  slidesToShow?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  children,
  slidesToShow = 4,
}) => {
  const sliderRef = useRef<Slider>(null);

  const next = () => sliderRef.current?.slickNext();
  const previous = () => sliderRef.current?.slickPrev();

  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true, // свайп пальцем
    arrows: true, // стрелки по умолчанию
    responsive: [
      {
        breakpoint: 768, // мобильные экраны
        settings: {
          arrows: false, // стрелки скрываем
          slidesToShow: 1.5, // адаптивное кол-во карточек
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      {/* Десктопные стрелки */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer">
        <ArrowLeft onClick={previous} className="h-6 w-6 transition-transform hover:scale-110" />
      </div>
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer">
        <ArrowRight onClick={next} className="h-6 w-6 transition-transform hover:scale-110" />
      </div>

      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default CustomSlider;
