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

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "courier">("pickup");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null); // ← string (UUID)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddressData, setNewAddressData] = useState<AddressFormData>(EMPTY_ADDRESS);
  const [confirmedNewAddress, setConfirmedNewAddress] = useState<AddressFormData | null>(null); // ← новий стейт
  const [saveNewAddress, setSaveNewAddress] = useState(false);

  const [expandedAddressId, setExpandedAddressId] = useState<string | null>(null);

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    region: "",
    street: "",
    house: "",
    apartment: "",
    floor: "",
    hasElevator: false as boolean,
  });

  // Автопідстановка контактів для авторизованого
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
      setSelectedAddressId(def.id); // ← def.id тепер string
      setDeliveryMethod("courier");
    }
  }, [isAuthenticated, user?.name, user?.phone]);

  // Email приходить асинхронно
  useEffect(() => {
    if (user?.email) {
      setContact((prev) => ({ ...prev, email: user.email! }));
    }
  }, [user?.email]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) ?? null;

  const getDeliveryAddr = (): Address | AddressFormData | null => {
    if (!isAuthenticated && deliveryMethod === "courier") {
      return {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        city: contact.city,
        region: contact.region,
        street: contact.street,
        house: contact.house,
        apartment: contact.apartment,
        floor: contact.floor,
        hasElevator: contact.hasElevator,
      };
    }
    if (selectedAddress) return selectedAddress;
    // ← confirmedNewAddress замість showNewAddressForm
    if (confirmedNewAddress && isAddressValid(confirmedNewAddress)) return confirmedNewAddress;
    return null;
  };

  // ← прибрано setTimeout, додано confirmedNewAddress
  const handleConfirmNewAddress = async () => {
    if (saveNewAddress) {
      await addAddress({ ...newAddressData, hasElevator: newAddressData.hasElevator ?? false });
      setSaveNewAddress(false);
    }
    setConfirmedNewAddress({ ...newAddressData }); // зберігаємо для getDeliveryAddr
    setNewAddressData(EMPTY_ADDRESS);
    setShowNewAddressForm(false);
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
      if (!isAuthenticated) {
        if (!contact.city?.trim()) e.city = "Введіть місто";
        if (!contact.street?.trim()) e.street = "Введіть вулицю";
        if (!contact.house?.trim()) e.house = "Введіть будинок";
      } else {
        const addr = getDeliveryAddr();
        if (!addr) e.address = "Виберіть або вкажіть адресу доставки";
      }
    }

    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    let deliveryPayload: CreateOrderDTO["delivery"] = { method: deliveryMethod };
    let recipient: CreateOrderDTO["recipient"] = undefined;

    if (deliveryMethod === "courier") {
      const addr = getDeliveryAddr();
      if (addr) {
        // ← уніфікований маппінг, house скрізь однаково
        deliveryPayload = {
          method: deliveryMethod,
          city: addr.city,
          region: addr.region,
          street: addr.street,
          build: addr.house,
          apartament: addr.apartment ?? "",
          floor: addr.floor ?? "",
          elevator: addr.hasElevator ?? false,
        };

        recipient = !isAuthenticated
          ? {
              firstName: contact.firstName,
              lastName: contact.lastName,
              phone: contact.phone,
            }
          : {
              firstName: addr.firstName,
              lastName: addr.lastName,
              phone: addr.phone,
            };
      }
    }

    setLoading(true);
    try {
      const order = await submitOrder({
        customer: contact,
        recipient,
        delivery: deliveryPayload,
        paymentMethod: deliveryMethod === "pickup" ? "cash" : "prepayment",
        items: items.map(({ product, quantity }) => ({
          productId: product.id,
          title: product.title,
          image: product.images[0],
          quantity,
          price: product.price,
        })),
        totalAmount: total,
      }, !isAuthenticated, user?.id);

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
            showAddressFields={!isAuthenticated && deliveryMethod === "courier"}
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
                      setConfirmedNewAddress(null); // ← скидаємо при зміні методу
                    }}
                    className="h-6 w-6"
                  />
                  <label htmlFor={id} className="text-[20px] leading-[120%]">{label}</label>
                </div>
              ))}
            </div>
            <p className="mt-5 text-accent">Магазин працює ПН - НД: 09:00-20:00</p>

            {/* Адреси — тільки для авторизованих */}
            {isAuthenticated && deliveryMethod === "courier" && (
              <div className="mt-6 flex flex-col gap-4">

{addresses.length > 0 && !showNewAddressForm && (
  <div className="flex flex-col gap-2">
    <p className="text-sm text-gray-500 font-medium">
      Виберіть адресу доставки:
    </p>
    {addresses.map((addr) => {
      const isSelected = selectedAddressId === addr.id;
      const isExpanded = expandedAddressId === addr.id;
      return (
        <div
          key={addr.id}
          className={`rounded-xl border transition-colors ${
            isSelected ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"
          }`}
        >
          {/* Головний рядок — клік вибирає */}
          <div
            className="flex items-start gap-3 px-4 py-3 cursor-pointer"
            onClick={() => {
              setSelectedAddressId(addr.id);
              setConfirmedNewAddress(null);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
          >
            <input
              type="radio"
              name="deliveryAddress"
              checked={isSelected}
              onChange={() => {}}
              className="mt-0.5 w-4 h-4 shrink-0"
            />
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-sm">
                м. {addr.city}, вул. {addr.street} {addr.house}
                {addr.apartment ? `, кв. ${addr.apartment}` : ""}
              </span>
              {addr.isDefault && (
                <span className="inline-flex w-fit bg-black text-white text-[10px] px-2 py-0.5 rounded-full tracking-wide">
                  Основна
                </span>
              )}
            </div>
            {/* Кнопка expand — окремий клік щоб не конфліктував з radio */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedAddressId((prev) => prev === addr.id ? null : addr.id);
              }}
              className="text-gray-400 hover:text-black transition-colors ml-auto shrink-0 mt-0.5"
              aria-label="Деталі адреси"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Розгорнуті деталі */}
          {isExpanded && (
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 flex flex-col gap-1.5 text-sm text-gray-600">
              <p><span className="text-gray-400 text-xs">Отримувач:</span> {addr.firstName} {addr.lastName}</p>
              <p><span className="text-gray-400 text-xs">Телефон:</span> {addr.phone}</p>
              <p><span className="text-gray-400 text-xs">Адреса:</span> м. {addr.city}{addr.region ? `, ${addr.region} обл.` : ""}, вул. {addr.street} {addr.house}
                {addr.apartment ? `, кв. ${addr.apartment}` : ""}
                {addr.floor ? `, поверх ${addr.floor}` : ""}
              </p>
              <p><span className="text-gray-400 text-xs">Ліфт:</span> {addr.hasElevator ? "є" : "немає"}</p>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

                {/* Показуємо підтверджену нову адресу якщо не збереглась */}
                {!showNewAddressForm && confirmedNewAddress && !selectedAddress && (
                  <div className="px-4 py-3 rounded-xl border border-black bg-gray-50 text-sm">
                    <p className="font-medium mb-0.5">Нова адреса (не збережена)</p>
                    <p className="text-gray-600">
                      м. {confirmedNewAddress.city}, вул. {confirmedNewAddress.street} {confirmedNewAddress.house}
                    </p>
                    <button
                      onClick={() => setConfirmedNewAddress(null)}
                      className="text-xs text-gray-400 hover:text-red-500 mt-1 transition-colors"
                    >
                      Скасувати
                    </button>
                  </div>
                )}

                {addresses.length === 0 && !showNewAddressForm && !confirmedNewAddress && (
                  <p className="text-sm text-gray-400">У вас ще немає збережених адрес</p>
                )}

                {errors.address && (
                  <span className="text-xs text-red-500">{errors.address}</span>
                )}

                {showNewAddressForm ? (
                  <div className="p-4 border border-gray-200 rounded-xl bg-white">
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
                      setConfirmedNewAddress(null);
                      setNewAddressData(EMPTY_ADDRESS);
                    }}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Додати нову адресу
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Оплата */}
          <div className="mt-[64px] flex flex-col gap-y-6">
            <span className="text-[24px] leading-[120%]">Оплата</span>
            <p className="text-[20px] leading-[120%]">
              {deliveryMethod === "pickup" ? "Оплата при отриманні" : "100% передоплата"}
            </p>
            <p className="text-accent">
              {deliveryMethod === "pickup"
                ? "Оплата здійснюється готівкою або картою."
                : "Оплата здійснюється на рахунок до відправки товару."}
            </p>
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