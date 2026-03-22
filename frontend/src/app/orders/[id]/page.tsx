"use client";

import { useOrderContext } from "@/context/OrderContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/animatedSection";

const OrderPage = () => {
  const { orders } = useOrderContext();
  const params = useParams();

  const order = orders.find((o) => String(o.id) === String(params.id));

  if (!order) {
    return (
      <section className="mx-auto max-w-[1440px] px-4 py-20 text-center">
        <h1 className="text-2xl">Замовлення не знайдено</h1>
        <Link href="/" className="mt-6 inline-block underline">На головну</Link>
      </section>
    );
  }

  const recipientDiffers =
    order.recipient &&
    (order.recipient.firstName !== order.customer.firstName ||
      order.recipient.lastName !== order.customer.lastName ||
      order.recipient.phone !== order.customer.phone);

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-20 py-20">
      <Link
        href="/profile/orders"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Мої замовлення
      </Link>

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
          <span className="text-green-600 font-medium">Нове</span>
        </div>

        {/* Контактні дані */}
        <div>
          <h2 className="text-[20px] font-semibold mb-3">Контактні дані</h2>
          <div className="flex flex-col gap-1 text-sm">
            <p>{order.customer.firstName} {order.customer.lastName}</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.email}</p>
          </div>
        </div>

        {/* Отримувач — тільки якщо відрізняється від контакту */}
        {recipientDiffers && (
          <div>
            <h2 className="text-[20px] font-semibold mb-3">Отримувач</h2>
            <div className="flex flex-col gap-1 text-sm">
              <p>{order.recipient!.firstName} {order.recipient!.lastName}</p>
              <p>{order.recipient!.phone}</p>
            </div>
          </div>
        )}

        {/* Доставка */}
        <div>
          <h2 className="text-[20px] font-semibold mb-3">Доставка</h2>
          {order.delivery.method === "pickup" ? (
            <p className="text-sm">Самовивіз з магазину</p>
          ) : (
            <div className="flex flex-col gap-1.5 text-sm">
              {order.delivery.city && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32 shrink-0">Місто:</span>
                  <span>{order.delivery.city}</span>
                </div>
              )}
              {order.delivery.region && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32 shrink-0">Область:</span>
                  <span>{order.delivery.region}</span>
                </div>
              )}
              {order.delivery.street && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32 shrink-0">Вулиця:</span>
                  <span>{order.delivery.street}</span>
                </div>
              )}
              {order.delivery.build && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32 shrink-0">Будинок:</span>
                  <span>{order.delivery.build}</span>
                </div>
              )}
              {order.delivery.apartament && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32 shrink-0">Квартира:</span>
                  <span>{order.delivery.apartament}</span>
                </div>
              )}
              {order.delivery.floor && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-32 shrink-0">Поверх:</span>
                  <span>{order.delivery.floor}</span>
                </div>
              )}
              <div className="flex gap-2">
                <span className="text-gray-500 w-32 shrink-0">Вантажний ліфт:</span>
                <span>{order.delivery.elevator ? "Є" : "Немає"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Спосіб оплати */}
        <div>
          <h2 className="text-[20px] font-semibold mb-3">Оплата</h2>
          <p className="text-sm">
            {order.delivery.method === "pickup"
              ? "Оплата при отриманні"
              : "100% передоплата"}
          </p>
        </div>

        {/* Товари */}
        <div>
          <h2 className="text-[20px] font-semibold mb-4">Товари</h2>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-center">
                <div className="w-[80px] h-[80px] bg-gray-100 flex-shrink-0 flex items-center justify-center rounded overflow-hidden">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded" />
                  )}
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