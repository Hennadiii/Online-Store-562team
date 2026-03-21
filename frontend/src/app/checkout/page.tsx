"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CheckoutItem from "@/components/checkout/checkoutItem";
import { Button } from "@/components/ui/button";
import ContactInfoForm from "@/components/checkout/contactInfoForm";
import AnimatedSection from "@/components/shared/animatedSection";
import { useCartContext } from "@/context/CartContext";
import { useOrderContext } from "@/context/OrderContext";
import { submitOrder } from "@/services/orderService";
import { useAddressContext, Address } from "@/context/AddressContext";
import { useAuthContext } from "@/context/AuthContext";
import AddressForm, { AddressFormData, EMPTY_ADDRESS, isAddressValid } from "@/components/address/AddressForm";
import { CreateOrderDTO } from "@/@types/order";
import Link from "next/link";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCartContext();
  const { addOrder } = useOrderContext();
  const { addresses, addAddress, getDefault } = useAddressContext();
  const { isAuthenticated, user } = useAuthContext();

  console.log("USER:", user); // ← додай це

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "courier">("pickup");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddressData, setNewAddressData] = useState<AddressFormData>(EMPTY_ADDRESS);
  const [saveNewAddress, setSaveNewAddress] = useState(false);

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Автопідстановка імені та телефону
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const nameParts = user.name?.split(" ") || [];
    setContact((prev) => ({
      ...prev,
      firstName: nameParts[0] || prev.firstName,
      lastName: nameParts.slice(1).join(" ") || prev.lastName,
      phone: user.phone || prev.phone,
    }));

    const def = getDefault();
    if (def) {
      setSelectedAddressId(def.id);
      setDeliveryMethod("courier");
    }
  }, [isAuthenticated, user?.name, user?.phone]);

  // Окремий useEffect для email — приходить асинхронно з /user/me
  useEffect(() => {
    if (user?.email) {
      setContact((prev) => ({ ...prev, email: user.email! }));
    }
  }, [user?.email]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  // Адреса для замовлення — або вибрана зі списку, або введена вручну
  const activeAddress: Address | AddressFormData | null =
    selectedAddressId !== null ? (selectedAddress ?? null) : null;

  const handleConfirmNewAddress = () => {
    if (saveNewAddress) {
      // Зберігаємо в контекст — з'явиться в списку автоматично
      addAddress(newAddressData);
      // Скидаємо форму
      setNewAddressData(EMPTY_ADDRESS);
      setSaveNewAddress(false);
      setShowNewAddressForm(false);
      // Вибираємо щойно додану — вона буде останньою в списку
      // використовуємо поточну довжину як індикатор
      const newId = Date.now(); // AddressContext використовує Date.now() як id
      // Невелика затримка щоб контекст оновився
      setTimeout(() => {
        setSelectedAddressId(
          (prev) => addresses[addresses.length - 1]?.id ?? prev
        );
      }, 50);
    } else {
      // Не зберігаємо — просто використовуємо для поточного замовлення
      // Зберігаємо як тимчасову адресу в окремому стейті
      setShowNewAddressForm(false);
    }
    setErrors((prev) => ({ ...prev, address: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!contact.firstName.trim()) e.firstName = "Введіть імʼя";
    else if (contact.firstName.trim().length < 2) e.firstName = "Мінімум 2 символи";

    if (!contact.lastName.trim()) e.lastName = "Введіть прізвище";
    else if (contact.lastName.trim().length < 2) e.lastName = "Мінімум 2 символи";

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!contact.phone.trim()) e.phone = "Введіть телефон";
    else if (!phoneRegex.test(contact.phone.replace(/\s/g, ""))) e.phone = "Невірний формат";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email.trim()) e.email = "Введіть email";
    else if (!emailRegex.test(contact.email)) e.email = "Невірний формат";

    if (deliveryMethod === "courier") {
      const hasAddress = activeAddress !== null ||
        (showNewAddressForm && isAddressValid(newAddressData));
      if (!hasAddress) e.address = "Вкажіть адресу доставки";
    }

    return e;
  };

  const getDeliveryAddr = (): AddressFormData | Address | null => {
    if (activeAddress) return activeAddress;
    if (showNewAddressForm && isAddressValid(newAddressData)) return newAddressData;
    return null;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    let deliveryPayload: CreateOrderDTO["delivery"] = { method: deliveryMethod };

    if (deliveryMethod === "courier") {
      const addr = getDeliveryAddr();
      if (addr) {
        const house = "house" in addr ? (addr as Address).house : (addr as AddressFormData).house;
        deliveryPayload = {
          method: deliveryMethod,
          city: addr.city,
          region: addr.region,
          street: addr.street,
          build: house,
          apartament: addr.apartment ?? "",
          floor: addr.floor ?? "",
          elevator: addr.hasElevator ?? false,
        };
      }
    }

    setLoading(true);
    try {
      const order = await submitOrder({
        customer: contact,
        delivery: deliveryPayload,
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

      addOrder(order);
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
            values={contact}
            errors={errors}
            onChange={(field, value) => {
              setContact((prev) => ({ ...prev, [field]: value }));
              setErrors((prev) => ({ ...prev, [field]: "" }));
            }}
          />

          <div className="mt-[64px]">
            <h3 className="text-[24px] leading-[120%]">Інформація про доставку</h3>

            <div className="mt-6 flex items-center gap-x-8">
              {[
                { id: "pickup",  label: "Самовивіз з магазину" },
                { id: "courier", label: "Курʼєрська доставка" },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center gap-x-3">
                  <input
                    id={id}
                    type="checkbox"
                    checked={deliveryMethod === id}
                    onChange={() => {
                      setDeliveryMethod(id as "pickup" | "courier");
                      setShowNewAddressForm(false);
                    }}
                    className="h-6 w-6"
                  />
                  <label htmlFor={id} className="text-[20px] leading-[120%]">{label}</label>
                </div>
              ))}
            </div>
            <p className="mt-5 text-accent">Магазин працює ПН - НД: 09:00-20:00</p>

            {deliveryMethod === "courier" && (
              <div className="mt-6 flex flex-col gap-3">

                {/* Збережені адреси */}
                {isAuthenticated && addresses.length > 0 && !showNewAddressForm && (
                  <>
                    <p className="text-sm text-gray-500">Збережені адреси:</p>
                    {addresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => {
                          setSelectedAddressId(addr.id);
                          setErrors((prev) => ({ ...prev, address: "" }));
                        }}
                        className={`text-left px-4 py-3 rounded-xl border transition-colors text-sm ${
                          selectedAddressId === addr.id
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        м. {addr.city}, вул. {addr.street} {addr.house}
                        {addr.apartment ? `, кв. ${addr.apartment}` : ""}
                      </button>
                    ))}
                  </>
                )}

                {isAuthenticated && addresses.length === 0 && !showNewAddressForm && (
                  <p className="text-sm text-gray-400">У вас ще немає збережених адрес</p>
                )}

                {errors.address && (
                  <span className="text-xs text-red-500">{errors.address}</span>
                )}

                {/* Форма нової адреси */}
                {showNewAddressForm ? (
                  <div className="mt-2 p-4 border border-gray-200 rounded-xl bg-white">
                    <p className="text-sm font-medium mb-3">Нова адреса доставки</p>
                    <AddressForm
                      data={newAddressData}
                      onChange={(field, value) =>
                        setNewAddressData((prev) => ({ ...prev, [field]: value }))
                      }
                      onSubmit={handleConfirmNewAddress}
                      onCancel={() => {
                        setShowNewAddressForm(false);
                        setNewAddressData(EMPTY_ADDRESS);
                        setSaveNewAddress(false);
                        if (addresses.length > 0) {
                          setSelectedAddressId(getDefault()?.id ?? addresses[0].id);
                        }
                      }}
                      submitLabel="Підтвердити"
                      isValid={isAddressValid(newAddressData)}
                      saveCheckbox={isAuthenticated}
                      saveValue={saveNewAddress}
                      onSaveToggle={setSaveNewAddress}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewAddressForm(true);
                      setSelectedAddressId(null);
                      setNewAddressData(EMPTY_ADDRESS);
                    }}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mt-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    {isAuthenticated ? "Додати нову адресу" : "Вказати адресу доставки"}
                  </button>
                )}
              </div>
            )}
          </div>

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