import Breadcrumbs from "@/components/shared/breadcrumbs";
import AnimatedSection from "@/components/shared/animatedSection";
import CategoryProducts from "./CategoryProducts";
import { getProductsByCategory } from "@/services/productService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  let response;
  try {
    // Завантажуємо всі товари категорії (pageSize=50)
    // Сортування і пагінація відбуваються в CategoryProducts на клієнті
    response = await getProductsByCategory(decodedCategory, 0, 50);
  } catch {
    notFound();
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-32">
      <AnimatedSection as="h1" className="text-h2 mt-14 text-center uppercase">
        {decodedCategory}
      </AnimatedSection>

      <Breadcrumbs className="mt-4" />

      {/* CategoryProducts — без змін, як був, але тепер отримує дані з API */}
      <CategoryProducts products={response.content} />
    </section>
  );
};

export default CategoryPage;