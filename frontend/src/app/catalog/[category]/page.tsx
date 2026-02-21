import { products } from "@/data/products";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import AnimatedSection from "@/components/shared/animatedSection";
import CategoryProducts from "./CategoryProducts";
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

      <CategoryProducts products={categoryProducts} />
    </section>
  );
};

export default CategoryPage;