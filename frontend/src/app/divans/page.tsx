import AnimatedSection from "@/components/shared/animatedSection";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CatalogItem from "@/components/shared/catalogItem";
import Filters from "@/components/shared/filters";

import Pagination from "@/components/shared/pagination";
import Image from "next/image";

const Divans = () => {
  return (
    <section className="bg-first mx-auto h-[100%] max-w-[1440px]  px-80px pb-[32px]">
     

      <h1 className="mt-[64px] text-center text-[64px] uppercase leading-[120%]">
        ДИВАНИ
      </h1>

      <Breadcrumbs className="mt-6" />

      <AnimatedSection threshold={0.01} className="mt-11 flex flex-col lg:flex-row gap-6">
        <Filters />

        <div className="relative h-full w-full max-w-[1000px]">

          <div className="absolute -top-1 right-1 flex cursor-pointer gap-x-3">
            <span className="font-second text-[20px]">Сортувати</span>
            <Image width={20} height={20} src="arrow-down.svg" alt="arrow" />
          </div>
          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-6">

            <CatalogItem
             
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
              
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
            
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
             
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
             
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
             
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
            <CatalogItem
             
              image="/divan2.png"
              title="Анамур"
              price="12 000"
            />
          </div>
          <Pagination />
        </div>
      </AnimatedSection>

      
    </section>
  );
};

export default Divans;
