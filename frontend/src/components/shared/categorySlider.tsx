import { useRef } from 'react';
import Slider from 'react-slick';
import CategoryItem from './categoryItem';

const CategorySlider: React.FC = () => {
  let sliderRef = useRef<null>(null);
  //@ts-ignore
  const next = () => sliderRef.slickNext();
  //@ts-ignore
  const previous = () => sliderRef.slickPrev();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    className: 'pl-[78px] pr-[45px] relative ',
    slidesToScroll: 3,
    arrows: false,
  };
  return (
    <div className="relative">
      <img
        onClick={previous}
        className="absolute bottom-[168px] left-5 h-6 w-6 cursor-pointer transition-transform hover:scale-110"
        src="arrow-left.svg"
      />
      <img
        onClick={next}
        className="absolute bottom-[168px] right-3 h-6 w-6 cursor-pointer transition-transform hover:scale-110"
        src="arrow-right.svg"
      />
      <Slider
        ref={(slider) => {
          //@ts-ignore
          sliderRef = slider;
        }}
        {...settings}
      >
        <CategoryItem img="chair.png">Стільці</CategoryItem>
        <CategoryItem img="divan.png">Дивани</CategoryItem>
        <CategoryItem img="stol.png">Столи</CategoryItem>
        <CategoryItem img="book.png">Книжкові полиці</CategoryItem>
        <CategoryItem img="lampa.png">Лампи</CategoryItem>
        <CategoryItem img="decor.png">Декор</CategoryItem>
        <CategoryItem img="stol.png">1</CategoryItem>
        <CategoryItem img="divan.png">2</CategoryItem>
        <CategoryItem img="stol.png">3</CategoryItem>
        <CategoryItem img="book.png">4</CategoryItem>
        <CategoryItem img="lampa.png">5</CategoryItem>
        <CategoryItem img="decor.png">6</CategoryItem>
        <CategoryItem img="stol.png">7</CategoryItem>
        <CategoryItem img="divan.png">8</CategoryItem>
        <CategoryItem img="stol.png">9</CategoryItem>
      </Slider>
    </div>
  );
};

export default CategorySlider;
