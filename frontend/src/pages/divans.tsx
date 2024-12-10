import { motion } from 'framer-motion';
import Header from '../components/shared/header';
import Filters from '../components/shared/filters';
import ProductItem from '../components/shared/productItem';

const Divans = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-first mx-auto h-full max-w-[1440px] overflow-x-hidden px-80px pb-[32px]"
    >
      <Header />

      <h1 className="mt-[64px] text-center text-[64px] uppercase leading-[120%]">
        ДИВАНИ
      </h1>

      <ul className="mt-6 flex items-center justify-center gap-x-3">
        {['Головна сторінка', '/', 'Каталог', '/', 'Дивани'].map((item) => (
          <li key={item}>
            <a>{item}</a>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex gap-x-3">
        <Filters />

        <div className="m mt-[105px] h-screen w-full">
          <div className="flex justify-between gap-x-[26px]">
            <ProductItem
              heightDiv="h-[226px]"
              heightImage="h-[199px]"
              widthDiv="w-[296px]"
              widthImage="w-[296px]"
              name="Анамур"
              image="divan.png"
            />
            <ProductItem
              heightDiv="h-[226px]"
              heightImage="h-[199px]"
              widthDiv="w-[296px]"
              widthImage="w-[296px]"
              name="Анамур"
              image="divan.png"
            />
            <ProductItem
              heightDiv="h-[226px]"
              heightImage="h-[199px]"
              widthDiv="w-[296px]"
              widthImage="w-[296px]"
              name="Анамур"
              image="divan.png"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Divans;
