import { useState } from 'react';
import ReactSlider from 'react-slider';

const Filters = () => {
  const [values, setValues] = useState([9000, 27000]);
  return (
    <div className="w-full max-w-[328px]">
      <span className="text-[20px] leading-[120%]">Фільтр</span>

      <span className="mt-10 block font-semibold leading-[120%]">Ціна</span>

      <div className="mt-6 w-full max-w-[304px]">
        <ReactSlider
          className="h-[3px] w-full bg-accent text-left"
          trackClassName="text-black"
          defaultValue={values}
          value={values}
          onChange={setValues}
          thumbClassName="w-4 h-4 bg-accent rounded-[50%] absolute top-[-7px] cursor-pointer"
          min={9000}
          max={27000}
          renderThumb={(props, state) => (
            <div className="relative" {...props}>
              <span className="absolute top-5 w-fit truncate text-[12px]">
                {state.valueNow} ₴
              </span>
            </div>
          )}
        />
      </div>

      <div className="mt-[52px] flex justify-between text-[12px]">
        <div className="flex items-center gap-x-1">
          <span>Від</span>
          <input
            className="ml-1 h-[30px] w-20 border border-grey px-5 py-2"
            defaultValue="10 000"
          />
          <span>₴</span>
        </div>
        <div className="mr-9 flex items-center gap-x-1">
          <span>До</span>
          <input
            className="ml-1 h-[30px] w-20 border border-grey px-5 py-2"
            defaultValue="15 000"
          />
          <span>₴</span>
        </div>
      </div>

      <span className="mt-8 block font-semibold leading-[120%]">Каталог</span>

      <div className="mt-5 flex flex-col gap-y-3">
        {[
          'Дивани',
          'Ліжка',
          'Тумби',
          'Крісла',
          'Шафи',
          'Комоди',
          'Освітлення',
          'Декор',
          'Матраци',
        ].map((item, index) => (
          <div key={index} className="flex gap-x-2">
            <input type="checkbox" className="h-6 w-6" id={item} />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>

      <button className="mt-5 h-[34px] w-[85px] p-[10px] text-[12px] text-grey">
        Скасувати
      </button>
    </div>
  );
};

export default Filters;
