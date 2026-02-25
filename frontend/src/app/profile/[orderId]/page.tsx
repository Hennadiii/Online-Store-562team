"use client";

import ProfileSidebar from "@/components/profile/sidebar";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus =
  | "new"
  | "accepted"
  | "packing"
  | "ready"
  | "shipped"
  | "delivered";

interface OrderStep {
  key: OrderStatus;
  label: string;
  date: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STEPS: OrderStep[] = [
  { key: "new",       label: "Нове замовлення",         date: "пт, 22 лист 2024р, 13:10" },
  { key: "accepted",  label: "Замовлення прийнято",     date: "пт, 22 лист 2024р, 13:10" },
  { key: "packing",   label: "У процесі комплектації",  date: "пт, 22 лист 2024р, 13:10" },
  { key: "ready",     label: "Готове до відправки",     date: "пт, 22 лист 2024р, 13:10" },
  { key: "shipped",   label: "Відправлено",             date: "пт, 22 лист 2024р, 13:10" },
  { key: "delivered", label: "Отримано",                date: "пт, 22 лист 2024р, 13:10" },
];

const CURRENT_STATUS: OrderStatus = "delivered";

const STATUS_BADGE: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  new:       { label: "Нове",              bg: "bg-blue-50",   text: "text-blue-600"  },
  accepted:  { label: "Прийнято",          bg: "bg-yellow-50", text: "text-yellow-700"},
  packing:   { label: "Комплектується",    bg: "bg-orange-50", text: "text-orange-600"},
  ready:     { label: "Готове",            bg: "bg-teal-50",   text: "text-teal-600"  },
  shipped:   { label: "Відправлено",       bg: "bg-purple-50", text: "text-purple-600"},
  delivered: { label: "Отримано",          bg: "bg-green-50",  text: "text-green-700" },
};

// ─── Progress Timeline ────────────────────────────────────────────────────────

const Timeline = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="flex gap-4 sm:gap-6">
      {/* Line + dots */}
      <div className="relative flex flex-col items-center pt-1">
        <div className="absolute top-2 bottom-2 w-[2px] bg-gray-200 left-1/2 -translate-x-1/2" />
        <div className="absolute top-2 w-[2px] bg-accent left-1/2 -translate-x-1/2 transition-all duration-500"
          style={{ height: `calc(${(currentIndex / (STEPS.length - 1)) * 100}% - 8px)` }}
        />
        <div className="relative flex flex-col justify-between h-full gap-0" style={{ height: `${(STEPS.length - 1) * 48}px` }}>
          {STEPS.map((step, i) => {
            const done = i <= currentIndex;
            return (
              <div
                key={step.key}
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 ${
                  done
                    ? "bg-accent border-accent"
                    : "bg-white border-gray-300"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Labels */}
      <ul className="flex flex-col justify-between" style={{ height: `${(STEPS.length - 1) * 48}px` }}>
        {STEPS.map((step, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <li key={step.key}>
              <p className={`text-sm leading-tight ${active ? "font-semibold text-black" : done ? "font-medium text-gray-700" : "font-normal text-gray-400"}`}>
                {step.label}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">{step.date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const OrderDetailPage = () => {
  const badge = STATUS_BADGE[CURRENT_STATUS];

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto pb-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />

        <section className="flex-1">
          {/* Back */}
          <Link
            href="/profile/orders"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors mb-5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Мої замовлення
          </Link>

          <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-sm p-5 sm:p-8 flex flex-col gap-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">№ 1203322123</h2>
                <p className="text-xs text-gray-400 mt-1">Замовлено: 22 листопада 2024 р, 12:12</p>
              </div>
              <span className={`self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full ${badge.bg} ${badge.text}`}>
                {badge.label}
              </span>
            </div>

            {/* Timeline */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
                Статус замовлення
              </h3>
              <Timeline currentStatus={CURRENT_STATUS} />
            </div>

            {/* Products */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold mb-4">2 товари</h3>
              <div className="flex gap-3 flex-wrap">
                {[1, 2].map((i) => (
                  <div key={i} className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                    <Image
                      width={150}
                      height={150}
                      src="/krislo.png"
                      alt="item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment + Summary */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:justify-between gap-6">
              {/* Payment method */}
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Спосіб оплати</p>
                <div className="flex items-center justify-center border border-gray-200 rounded-lg w-[80px] h-[44px] px-3">
                  <Image width={49} height={16} src="/visa.svg" alt="visa" />
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ціна</span>
                  <span>3 000 ₴</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Доставка</span>
                  <span>0 ₴</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-3">
                  <span>Загальна сума</span>
                  <span>3 000 ₴</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm font-semibold mb-4">
                Кур'єрська доставка · Оплата при отриманні
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">Адреса доставки</p>
                  <p className="text-sm">м. Київ, вул. Святошинська 8/95/10</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">Отримувач</p>
                  <p className="text-sm">Марина Зоряна</p>
                  <p className="text-sm">+380 (33) 219 00 33</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-gray-100 pt-6">
              <button
                style={{ backgroundColor: "#0c1a1a", color: "#ffffff" }}
                className="w-full sm:w-auto px-8 h-[44px] rounded-xl text-sm font-medium hover:opacity-80 transition-all cursor-pointer"
              >
                Купити повторно
              </button>
            </div>

          </div>
        </section>
      </div>
    </section>
  );
};

export default OrderDetailPage;