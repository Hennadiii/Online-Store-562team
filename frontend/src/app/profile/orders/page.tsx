"use client";

import ProfileOrderItem from "@/components/profile/orderItem";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import CatalogItem from "@/components/shared/catalogItem";
import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/context/OrderContext";
import { products } from "@/data/products";
import { useState } from "react";
import Link from "next/link";

const recommended = products.slice(0, 4);
const statuses = ["Усі", "Нове", "Обробляється", "Відправлено", "Отримано", "Повернено"];

const MyOrders = () => {
  const { orders, loading } = useOrderContext();
  const [activeStatus, setActiveStatus] = useState("Усі");

  const filteredOrders =
    activeStatus === "Усі"
      ? orders
      : orders.filter((o) => o.status === activeStatus);

  return (
    <AnimatedSection className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto pb-20">
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />

        <div className="flex-1 flex flex-col gap-6">
          {/* Фільтр замовлень */}
          <div className="flex overflow-x-auto gap-3 mb-6 py-2">
            {statuses.map((status) => {
              const isActive = status === activeStatus;
              return (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
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

          {/* Список замовлень */}
          <div className="flex flex-col gap-6">
            {loading ? (
              <p className="text-gray-400">Завантаження...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-gray-400">У вас ще немає замовлень</p>
            ) : (
              filteredOrders.map((order) => (
                <ProfileOrderItem key={order.id} order={order} />
              ))
            )}
          </div>

          {/* Рекомендації */}
          <h3 className="text-[20px] sm:text-[24px] lg:text-[32px] leading-[120%] uppercase mt-12 sm:mt-16 lg:mt-20 text-center px-2">
            Вам може сподобатись
          </h3>

          <section className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {recommended.map((product) => (
              <CatalogItem
                key={product.id}
                title={product.title}
                image={product.images[0]}
                price={`${product.price.toLocaleString("uk-UA")} ₴`}
                href={`/product/${product.id}`}
              />
            ))}
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