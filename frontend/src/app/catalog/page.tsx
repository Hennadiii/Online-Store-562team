import AnimatedSection from "@/components/shared/animatedSection";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CatalogItem from "@/components/shared/catalogItem";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Pagination from "@/components/shared/pagination";

export const metadata = {
  title: "Cozy Corners | Каталог",
  description: "Офіційна сторінка каталога нашого сайту.",
};

const CatalogPage: React.FC = () => {
  return (
    <section className="px-80px mx-auto h-full overflow-hidden max-w-[1440px] bg-first pb-[32px]">
      <Header />
      <AnimatedSection as="h1" className="text-h2 mt-14 text-center uppercase">
        Каталог
      </AnimatedSection>

      <Breadcrumbs className="mt-4" />

      <AnimatedSection
        as="div"
        className="mt-[65px] flex flex-wrap gap-x-[32px] gap-y-[30px]"
      >
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
        <CatalogItem image="/krislo.png" title="Крісла" />
      </AnimatedSection>

      <Pagination />

      <Footer />
    </section>
  );
};

export default CatalogPage;
