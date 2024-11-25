import ReactPaginate from 'react-paginate';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import ProductItem from '../components/shared/productItem';
import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  'Дивани',
  'Ліжка',
  'Крісла',
  'Шафи',
  'Тумби',
  'Комоди',
  'Матраци',
  'Освітлення',
  'Декор',
];

const CatalogPage: React.FC = () => {
  const itemsPerPage = 12;
  const items = [...Array(100).keys()];
  const [_, setItemOffset] = useState<number>(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  //const endOffset = itemOffset + itemsPerPage;
  // const currentItems = items.slice(itemOffset, endOffset);
  //  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-80px mx-auto h-full max-w-[1440px] bg-first pb-[32px]"
    >
      <Header />
      <h1 className="text-h2 mt-14 text-center uppercase">Каталог</h1>

      <nav className="mt-4 flex justify-center">
        <ul className="flex items-center gap-x-5">
          {['Головна сторінка', '/', 'Каталог'].map((item, index) => (
            <li key={index}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="mt-10 flex items-center justify-center gap-x-8">
        {tabs.map((item, index) => (
          <li className="cursor-pointer p-2" key={index}>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-[53px] flex flex-wrap gap-[20px] gap-y-[30px]">
        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />

        <ProductItem
          image="divan.png"
          name="Крісло Софт"
          price="4,500"
          heightImage="h-[399px]"
          variant={true}
        />
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Вперед"
        nextClassName="ml-auto"
        previousLabel="Назад"
        previousClassName="mr-auto"
        containerClassName="mt-20 flex gap-x-6 text-[20px]"
        activeClassName="underline"
        disabledLinkClassName="cursor-default text-grey"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={4}
        renderOnZeroPageCount={null}
      />

      <Footer />
    </motion.section>
  );
};

export default CatalogPage;
