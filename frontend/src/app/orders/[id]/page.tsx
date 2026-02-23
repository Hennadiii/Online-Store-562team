"use client";

import { useOrderContext } from "@/context/OrderContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/animatedSection";


const OrderPage = () => {
  const { order } = useOrderContext();
  const params = useParams();

  if (!order || order.id !== params.id) {
    return (
      <section className="mx-auto max-w-[1440px] px-4 py-20 text-center">
        <h1 className="text-2xl">Замовлення не знайдено</h1>
        <Link href="/" className="mt-6 inline-block underline">На головну</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 py-20">
      <AnimatedSection as="h1" className="text-center text-[32px] sm:text-[48px] uppercase leading-[120%]">
        Дякуємо за замовлення!
      </AnimatedSection>

      <div className="mt-10 max-w-[700px] mx-auto flex flex-col gap-8">

        {/* Статус */}
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-500">Номер замовлення</span>
          <span className="font-semibold">#{order.id}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-500">Статус</span>
          <span className="text-green-600 font-medium">Створено</span>
        </div>

        {/* Контактні дані */}
        <div>
          <h2 className="text-[20px] font-semibold mb-3">Контактні дані</h2>
          <p>{order.customer.lastName} {order.customer.firstName}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.email}</p>
        </div>

        {/* Доставка */}
        <div>
          <h2 className="text-[20px] font-semibold mb-3">Доставка</h2>
          {order.delivery.method === "pickup" ? (
            <p>Самовивіз з магазину</p>
          ) : (
            <>
              <p>{order.delivery.city}, {order.delivery.region}</p>
              <p>{order.delivery.street}, {order.delivery.build}</p>
              {order.delivery.apartament && <p>Кв. {order.delivery.apartament}, поверх {order.delivery.floor}</p>}
            </>
          )}
        </div>

        {/* Товари */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4">Товари</h2>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-center">
                <div className="w-[80px] h-[80px] bg-gray-100 flex-shrink-0 flex items-center justify-center rounded overflow-hidden">
                  <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain" />
                </div>
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="font-medium">{(item.price * item.quantity).toLocaleString("uk-UA")} ₴</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Сума */}
        <div className="border-t pt-4 flex justify-between text-[20px] font-semibold">
          <span>Разом</span>
          <span>{order.totalAmount.toLocaleString("uk-UA")} ₴</span>
        </div>

        <Link href="/catalog">
          <Button variant="black" className="w-full">Продовжити покупки</Button>
        </Link>

      </div>
    </section>
  );
};

export default OrderPage;