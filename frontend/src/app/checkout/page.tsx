"use client";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CheckoutItem from "@/components/checkout/checkoutItem";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ContactInfoForm from "@/components/checkout/contactInfoForm";
import DeliveryInfoForm from "@/components/checkout/deliveryInfoForm";
import AnimatedSection from "@/components/shared/animatedSection";

const CheckoutPage = () => {
  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] px-80px pb-[32px]">
      <Header />
      <AnimatedSection
        as="h1"
        className="mt-[64px] text-center text-[64px] uppercase leading-[120%]"
      >
        Оформлення замовлення
      </AnimatedSection>

      <Breadcrumbs className="mt-6" />

      <AnimatedSection className="flex gap-x-[111px]">
        <div className="mt-12 w-full max-w-[622px]">
          <h2 className="text-[24px] leading-[120%]">Контактна інформація</h2>

          <ContactInfoForm className="mt-6" />

          {/* Доставка */}
          <DeliveryInfoForm />

          {/* Оплата */}
          <div className="mt-[64px] flex flex-col gap-y-6">
            <span className="text-[24px] leading-[120%]">Оплата</span>
            <p className="text-[20px] leading-[120%]">Оплата при отриманні</p>
            <p className="text-accent">
              Оплата здійснюється готівкою або картою.
            </p>
          </div>

          <Button className="mt-14 border-black">зберегти</Button>
        </div>

        {/* Блок с заказом */}
        <div className="mt-11 h-[608px] w-full max-w-[547px]">
          <div className="flex justify-between">
            <span className="block text-[24px]">Ваше замовлення</span>
            <div className="flex items-center gap-x-2">
              <Image width={24} height={24} src="/edit.svg" alt="edit" />
              <span className="text-accent underline">Ред.</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-y-8">
            <CheckoutItem />
            <CheckoutItem />
          </div>

          <div className="mt-8 flex justify-between">
            <span>Підсумок</span>
            <span>11 600 ₴</span>
          </div>
          <div className="flex justify-between">
            <span>Доставка</span>
            <span>0 ₴</span>
          </div>
          <div className="mt-5 flex justify-between">
            <span className="text-[24px]">Разом</span>
            <span className="text-[20px] font-semibold">11 600 ₴</span>
          </div>

          <Button variant="black" className="mt-9 w-full truncate">
            ОФОРМИТИ замовлення
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CheckoutPage;
