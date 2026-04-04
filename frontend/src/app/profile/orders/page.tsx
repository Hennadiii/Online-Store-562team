"use client";

import ProfileOrderItem from "@/components/profile/orderItem";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import CatalogItem from "@/components/shared/catalogItem";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/context/OrderContext";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const statuses = ["Усі", "Нове", "Обробляється", "Відправлено", "Отримано", "Повернено"];

const statusMap: Record<string, string> = {
  UNPAID: "Нове",
  PAID: "Обробляється",
  SHIPPED: "Відправлено",
  DELIVERED: "Отримано",
  RETURNED: "Повернено",
  created: "Нове",
};

const ORDERS_PER_PAGE = 5;

const MyOrders = () => {
  const { orders, loading } = useOrderContext();
  const [activeStatus, setActiveStatus] = useState("Усі");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 recommended
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  const isFirstRender = useRef(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?page=0&pageSize=12&sort=addedAt&order=desc`
    )
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.content || [];

        // 👉 1. Собираем ID товаров из заказов
        const orderedProductIds = new Set(
          orders.flatMap((order: any) =>
            order.items?.map((item: any) => item.productId) || []
          )
        );

        // 👉 2. Убираем уже купленные
        const filtered = allProducts.filter(
          (product: any) => !orderedProductIds.has(product.id)
        );

        // 👉 3. Перемешиваем (рандом)
        const shuffled = filtered.sort(() => 0.5 - Math.random());

        // 👉 4. Берём первые 4
        setRecommended(shuffled.slice(0, 4));

        setLoadingRecommended(false);
      })
      .catch(() => setLoadingRecommended(false));
  }, [orders]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const filteredOrders =
    activeStatus === "Усі"
      ? orders
      : orders.filter((o) => {
          const mapped = statusMap[o.status] ?? o.status;
          return mapped === activeStatus;
        });

  const pageCount = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  return (
    <AnimatedSection className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto pb-20">
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex overflow-x-auto gap-3 mb-2 py-2">
            {statuses.map((status) => {
              const isActive = status === activeStatus;
              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-accent hover:text-white"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            {loading ? (
              <p className="text-gray-400">Завантаження...</p>
            ) : paginatedOrders.length === 0 ? (
              <p className="text-gray-400">У вас ще немає замовлень</p>
            ) : (
              paginatedOrders.map((order) => (
                <ProfileOrderItem key={order.id} order={order} />
              ))
            )}
          </div>

          {pageCount > 1 && (
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              containerClassName="mt-6 flex gap-x-4 text-[16px] sm:text-[20px] flex-wrap justify-center"
            />
          )}

          <h3 className="text-[20px] sm:text-[24px] lg:text-[32px] leading-[120%] uppercase mt-12 sm:mt-16 lg:mt-20 text-center px-2">
            Вам може сподобатись
          </h3>

          <section className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {loadingRecommended ? (
              <p className="text-gray-400 text-center col-span-full">Завантаження...</p>
            ) : recommended.length === 0 ? (
              <p className="text-gray-400 text-center col-span-full">Немає товарів</p>
            ) : (
              recommended.map((product) => (
                <CatalogItem
                  key={product.id}
                  title={product.title}
                  image={product.images?.[0]}
                  price={`${product.price?.toLocaleString("uk-UA")} ₴`}
                  href={`/product/${product.id}`}
                />
              ))
            )}
          </section>

          <Link href="/catalog" className="flex justify-center mt-8 sm:mt-12">
            <Button className="w-full max-w-[622px] active:bg-accent active:text-white text-white bg-black hover:text-black hover:bg-white border-accent">
              Каталог
            </Button>
          </Link>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default MyOrders;