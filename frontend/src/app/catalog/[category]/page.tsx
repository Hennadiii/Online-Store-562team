import { products } from "@/data/products";
import CatalogItem from "@/components/shared/catalogItem";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import AnimatedSection from "@/components/shared/animatedSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cozy Corners | Каталог",
  description: "Категорія товарів нашого сайту.",
};

interface PageProps {
    params: Promise<{ category: string }>;
  }
  
  const CategoryPage = async ({ params }: PageProps) => {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

  const categoryProducts = products.filter(
    (p) => p.category === decodedCategory
  );

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-32">
      <AnimatedSection as="h1" className="text-h2 mt-14 text-center uppercase">
        {decodedCategory}
      </AnimatedSection>

      <Breadcrumbs className="mt-4" />

      <AnimatedSection
        threshold={0.01}
        as="div"
        className="mt-[65px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <CatalogItem
              key={product.id}
              image={product.images[0]}
              title={product.title}
              price={`${product.price.toLocaleString("uk-UA")} грн`}
              href={`/product/${product.id}`}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-grey">
            Товари в цій категорії не знайдені.
          </p>
        )}
      </AnimatedSection>
    </section>
  );
};

export default CategoryPage;