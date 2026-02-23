"use client";

import ProfileOrderItem from "@/components/profile/orderItem";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import CatalogItem from "@/components/shared/catalogItem";
import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/context/OrderContext";
import { products } from "@/data/products";
import Link from "next/link";



const recommended = products.slice(0, 4);

const MyOrders = () => {
  const { orders } = useOrderContext();

  return (
    <AnimatedSection className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto pb-20">

      <section className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />

        <div className="w-full">
          <h2 className="text-[24px] leading-[120%]">Усі замовлення</h2>

          <div className="mt-8 flex flex-col gap-y-8">
            {orders.length === 0 ? (
              <p className="text-gray-400">У вас ще немає замовлень</p>
            ) : (
              orders.map((order) => (
                <ProfileOrderItem key={order.id} order={order} />
              ))
            )}
          </div>
        </div>
      </section>

      <h3 className="text-[20px] sm:text-[24px] lg:text-[32px] 
               leading-[120%] uppercase 
               mt-[64px] sm:mt-[80px] lg:mt-[104px] 
               text-center px-2">
  Вам може сподобатись
</h3>

      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

      <Link href="/catalog" className="flex justify-center">
        <Button className="w-full max-w-[622px] active:bg-accent active:text-white text-white bg-black hover:text-black hover:bg-white border-accent mt-[50px]">
          Каталог
        </Button>
      </Link>

    </AnimatedSection>
  );
};

export default MyOrders;