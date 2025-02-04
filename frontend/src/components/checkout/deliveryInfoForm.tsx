"use client";
import { cn } from "@/utils/twMerge";
import { useState } from "react";

// prettier-ignore
/* eslint-disable */
const inputFields = [
  { id: "city", label: "Місто", placeholder: "Введіть ваше місто" },
  { id: "region", label: "Область", placeholder: "Введіть вашу область" },
  { id: "street", label: "Вулиця", placeholder: "Введіть вашу вулицю" },
  { id: "build", label: "Будинок",  placeholder: "Введіть номер вашого будинку",},
  { id: "apartament",  label: "Квартира",  placeholder: "Введіть номер вашої квартири",},
  { id: "floor", label: "Поверх", placeholder: "Введіть поверх" },
];

const deliveryOptions = [
  { id: "pickup", label: "Самовивіз з магазину" },
  { id: "courier", label: "Курʼєрська доставка" },
];

const DeliveryInfoForm: React.FC = () => {
  const [elevatorExist, setElevatorExist] = useState<boolean>(false);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  return (
    <section>
      <div className="mt-[64px]">
        <h3 className="block text-[24px] leading-[120%]">
          Інформація про доставку
        </h3>
        <div className="mt-6 flex items-center justify-between gap-x-2">
          {deliveryOptions.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-x-3">
              <input
                id={id}
                type="checkbox"
                name="delivery"
                checked={deliveryMethod === id}
                onChange={() => setDeliveryMethod(id)}
                className="h-6 w-6"
              />
              <label htmlFor={id} className="text-[20px] leading-[120%]">
                {label}
              </label>
            </div>
          ))}
        </div>
        <p className="mt-5 text-accent">Магазин працює ПН - НД: 09:00-20:00</p>
      </div>

      <form
        className={cn(
          "flex w-full flex-col gap-y-[34px] overflow-hidden trasition-all duration-700 ease-in-out",
          {
            "max-h-0": deliveryMethod == "pickup",
            "max-h-screen": deliveryMethod !== "pickup",
          },
        )}
      >
        {inputFields.map(({ id, label, placeholder }) => (
          <div key={id} className="flex w-full flex-col gap-y-[7px]">
            <label
              htmlFor={id}
              className="text-[12px] leading-[120%] text-accent"
            >
              {label}
            </label>
            <input
              id={id}
              className="h-[43px] w-full border-b-[1px] px-2 py-3"
              placeholder={placeholder}
            />
          </div>
        ))}

        <div className="flex gap-x-3 items-center">
          <input
            id="elevator"
            className="w-6 h-6"
            type="checkbox"
            onChange={(e) => setElevatorExist((prev) => !prev)}
            checked={elevatorExist}
          />
          <label htmlFor="elevator">Наявність вантажного ліфта</label>
        </div>
      </form>
    </section>
  );
};

export default DeliveryInfoForm;
