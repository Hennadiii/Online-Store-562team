"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CheckoutItem from "@/components/checkout/checkoutItem";
import { Button } from "@/components/ui/button";
import ContactInfoForm from "@/components/checkout/contactInfoForm";
import DeliveryInfoForm from "@/components/checkout/deliveryInfoForm";
import AnimatedSection from "@/components/shared/animatedSection";
import { useCartContext } from "@/context/CartContext";
import { useOrderContext } from "@/context/OrderContext";
import { submitOrder } from "@/services/orderService";
import Link from "next/link";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCartContext();
  const { addOrder } = useOrderContext();

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    deliveryMethod: "pickup" as "pickup" | "courier",
    city: "",
    region: "",
    street: "",
    build: "",
    apartament: "",
    floor: "",
    elevator: false,
  });

  const validate = () => {
    const e: Record<string, string> = {};
  
    if (!form.firstName.trim()) {
      e.firstName = "Введіть імʼя";
    } else if (form.firstName.trim().length < 2) {
      e.firstName = "Імʼя має містити мінімум 2 символи";
    }
  
    if (!form.lastName.trim()) {
      e.lastName = "Введіть прізвище";
    } else if (form.lastName.trim().length < 2) {
      e.lastName = "Прізвище має містити мінімум 2 символи";
    }
  
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!form.phone.trim()) {
      e.phone = "Введіть телефон";
    } else if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "Невірний формат телефону";
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      e.email = "Введіть email";
    } else if (!emailRegex.test(form.email)) {
      e.email = "Невірний формат email";
    }
  
    if (form.deliveryMethod === "courier") {
      if (!form.city.trim()) e.city = "Введіть місто";
      if (!form.street.trim()) e.street = "Введіть вулицю";
      if (!form.build.trim()) e.build = "Введіть номер будинку";
    }
  
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      const order = await submitOrder({
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
        },
        delivery: {
          method: form.deliveryMethod,
          city: form.city,
          region: form.region,
          street: form.street,
          build: form.build,
          apartament: form.apartament,
          floor: form.floor,
          elevator: form.elevator,
        },
        paymentMethod: "cash",
        items: items.map(({ product, quantity }) => ({
          productId: product.id,
          title: product.title,
          image: product.images[0],
          quantity,
          price: product.price,
        })),
        totalAmount: total,
      });

      addOrder(order);(order);
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch {
      setErrors({ submit: "Помилка оформлення. Спробуйте ще раз." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] px-4 sm:px-6 lg:px-20 pb-[32px]">
      <AnimatedSection
        as="h1"
        className="mt-[64px] text-center text-[32px] sm:text-[48px] lg:text-[64px] uppercase leading-[120%]"
      >
        Оформлення замовлення
      </AnimatedSection>

      <Breadcrumbs className="mt-6" />

      <AnimatedSection className="flex flex-col lg:flex-row gap-x-[111px] gap-y-12">

        {/* LEFT */}
        <div className="mt-12 w-full lg:max-w-[622px]">
          <h2 className="text-[24px] leading-[120%]">Контактна інформація</h2>

          <ContactInfoForm
            className="mt-6"
            values={form}
            errors={errors}
            onChange={(field, value) => {
              setForm((prev) => ({ ...prev, [field]: value }));
              setErrors((prev) => ({ ...prev, [field]: "" }));
            }}
          />

          <DeliveryInfoForm
            values={form}
            errors={errors}
            onChange={(field, value) => {
              setForm((prev) => ({ ...prev, [field]: value }));
              setErrors((prev) => ({ ...prev, [field]: "" }));
            }}
          />

          <div className="mt-[64px] flex flex-col gap-y-6">
            <span className="text-[24px] leading-[120%]">Оплата</span>
            <p className="text-[20px] leading-[120%]">Оплата при отриманні</p>
            <p className="text-accent">Оплата здійснюється готівкою або картою.</p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="mt-0 lg:mt-11 w-full lg:max-w-[547px]">
          <span className="block text-[24px]">Ваше замовлення</span>

          {items.length === 0 ? (
            <p className="mt-8 text-gray-400">Кошик порожній</p>
          ) : (
            <>
              <div className="mt-8 flex flex-col gap-y-8">
                {items.map(({ product, quantity }) => (
                  <CheckoutItem
                    key={product.id}
                    image={product.images[0]}
                    title={product.title}
                    price={product.price}
                    quantity={quantity}
                    onRemove={() => removeFromCart(product.id)}
                    onIncrease={() => updateQuantity(product.id, quantity + 1)}
                    onDecrease={() => updateQuantity(product.id, quantity - 1)}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <span>Підсумок</span>
                <span>{total.toLocaleString("uk-UA")} ₴</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>0 ₴</span>
              </div>
              <div className="mt-5 flex justify-between">
                <span className="text-[24px]">Разом</span>
                <span className="text-[20px] font-semibold">{total.toLocaleString("uk-UA")} ₴</span>
              </div>

              <div className="mt-9 flex items-center gap-3">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed((prev) => !prev)}
                  className="w-5 h-5 cursor-pointer flex-shrink-0"
                />
                <label htmlFor="agree" className="text-sm">
                  Я згоден з{" "}
                  <Link href="/public-offer" className="underline hover:text-gray-600 transition" target="_blank">
                    умовами
                  </Link>
                </label>
              </div>

              {errors.submit && (
                <p className="mt-2 text-red-500 text-sm">{errors.submit}</p>
              )}

              <Button
                variant="black"
                className="mt-4 w-full"
                disabled={!agreed || loading}
                onClick={handleSubmit}
              >
                {loading ? "Оформлення..." : "ОФОРМИТИ замовлення"}
              </Button>
            </>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CheckoutPage;