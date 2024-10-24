import CategorySlider from '../components/shared/categorySlider';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import ProductItem from '../components/shared/productItem';
import { Button } from '../components/ui/button';

const ProductsPage: React.FC = () => {
  return (
    <main className="mx-auto h-[2000px] max-w-[1440px] bg-first">
      <Header />

      <div className="mt-[80px] font-bold">
        <h1 className="px-[75px] text-[64px] font-bold">Категорії</h1>
        <div className="mt-6">
          <CategorySlider />
        </div>
        <div className="mt-[60px] flex items-center justify-center gap-x-[30px]">
          <select className="bg-[#d9d9d9] px-5 py-4">
            <option>Ціна (доп.)</option>
          </select>
          <select className="bg-[#d9d9d9] px-5 py-4">
            <option>Сортувати</option>
          </select>
        </div>
      </div>

      <h2 className="mt-24 px-[75px] text-[64px] font-bold">Дивани</h2>

      <div className="mt-[110px] flex flex-wrap items-center gap-x-[30px] gap-y-[75px] px-[75px]">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>

      <Button
        variant="small"
        className="mx-auto mt-[75px] flex w-[190px] justify-center"
      >
        Load more
      </Button>

      <Footer />
    </main>
  );
};

export default ProductsPage;
