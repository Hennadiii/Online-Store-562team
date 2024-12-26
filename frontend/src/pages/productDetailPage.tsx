import { motion } from 'framer-motion';
import Header from '../components/shared/header';
import CategorySlider from '../components/shared/categorySlider';

const ProductDetailPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto h-full max-w-[1440px] overflow-x-hidden px-80px"
    >
      <Header />
      <ul className="mt-16 flex items-center justify-center gap-x-3">
        {[
          'Головна сторінка',
          '/',
          'Каталог',
          '/',
          'Дивани',
          '/',
          'Еко Хоум',
        ].map((item) => (
          <li key={item}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
      <div>
        <CategorySlider />
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
