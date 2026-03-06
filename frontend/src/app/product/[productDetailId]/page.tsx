// ЭТОТ ФАЙЛ: src/app/product/[productDetailId]/page.tsx
// Серверний компонент. Завантажує товар з API і передає в UI-компонент.
// Старий вміст цього файлу переноситься в ProductDetailPage.tsx (див. нижче)

import { getProductById } from "@/services/productService";
import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";

interface PageProps {
  params: Promise<{ productDetailId: string }>;
}

const ProductPage = async ({ params }: PageProps) => {
  const { productDetailId } = await params;
  const id = Number(productDetailId);

  if (isNaN(id)) notFound();

  let product;
  try {
    product = await getProductById(id);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "NOT_FOUND") notFound();
    throw e;
  }

  return <ProductDetailPage product={product} />;
};

export default ProductPage;