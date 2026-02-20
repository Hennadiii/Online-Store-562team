import AnimatedSection from "@/components/shared/animatedSection";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CatalogItem from "@/components/shared/catalogItem";

import Pagination from "@/components/shared/pagination";

export const metadata = {
  title: "Cozy Corners | Каталог",
  description: "Офіційна сторінка каталога нашого сайту.",
};

const CatalogPage: React.FC = () => {
  return (
    <section className="mx-auto h-full overflow-hidden max-w-[1440px] bg-first pb-[32px] px-4 sm:px-6 lg:px-8">
      
      <AnimatedSection as="h1" className="text-h2 mt-14 text-center uppercase">
        Каталог
      </AnimatedSection>

      <Breadcrumbs className="mt-4" />

      <AnimatedSection
        threshold={0.01}
        as="div"
        className="mt-[65px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"

      >
        <CatalogItem image="/divan001.jpg" title="Дивани" />
        <CatalogItem image="/Classic.jpg" title="Ліжка" />
        <CatalogItem image="/Loft1.jpg" title="Крісла" />
        <CatalogItem image="/Modern.jpg" title="Шафи" />
        <CatalogItem image="/Wood.jpg" title="Тумби" />
        <CatalogItem image="/Oslo.jpg" title="Комоди" />
      </AnimatedSection>

      <Pagination />

     
    </section>
  );
};

export default CatalogPage;
