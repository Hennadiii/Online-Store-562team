import { useRef, useState } from 'react';
import Slider from 'react-slick';
import CategoryItem from './productItem';
import ArrowRight from '../../assets/arrow-right.svg';
import ArrowLeft from '../../assets/arrow-left.svg';

const data = [
  <CategoryItem name="Дивани" image="divan.png" />,
  <CategoryItem name="Ліжка" image="divan.png" />,
  <CategoryItem name="Тумби" image="divan.png" />,
  <CategoryItem name="Крісла" image="divan.png" />,
  <CategoryItem name="Комоди" image="divan.png" />,
  <CategoryItem name="Дивани" image="divan.png" />,
  <CategoryItem name="Дивани2" image="divan.png" />,
  <CategoryItem name="Дивани3" image="divan.png" />,
  <CategoryItem name="Дивани4" image="divan.png" />,
];

const CategorySlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  let sliderRef = useRef<null>(null);
  //@ts-ignore
  const next = () => sliderRef.slickNext();
  //@ts-ignore
  const previous = () => sliderRef.slickPrev();

  //@ts-ignore
  const beforeChange = (prev, next) => {
    setIndex(Math.floor(next));
    console.log(next, data.length - 5);
  };

  const settings = {
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 4.25,
    className: 'relative flex items-center',
    slidesToScroll: 1,
    arrows: false,
    beforeChange: beforeChange,
  };

  return (
    <div className="relative">
      <ArrowLeft
        onClick={previous}
        className={`absolute right-[165px] top-[-80px] h-6 w-6 transition-transform hover:scale-110 ${index === 0 ? 'text-grey' : 'cursor-pointer'} `}
      />

      <ArrowRight
        onClick={next}
        className={`absolute right-2 top-[-80px] h-6 w-6 transition-transform hover:scale-110 ${index >= data.length - 5 ? 'text-grey' : 'cursor-pointer'} `}
      />

      <Slider
        ref={(slider) => {
          //@ts-ignore
          sliderRef = slider;
        }}
        {...settings}
      >
        {data.map((item) => item)}
        {/* <CategoryItem img="chair.png">Стільці</CategoryItem>
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
        <CategoryItem img="stol.png">9</CategoryItem> */}
      </Slider>
    </div>
  );
};

export default CategorySlider;
