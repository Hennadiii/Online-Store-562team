"use client";

import { cn } from "@/utils/twMerge";

interface FormValues {
  deliveryMethod: "pickup" | "courier";
  city: string;
  region: string;
  street: string;
  build: string;
  apartament: string;
  floor: string;
  elevator: boolean | null;
}

interface Props {
  values: FormValues;
  errors: Record<string, string>;
  onChange: (field: string, value: string | boolean | null) => void;
}

const inputFields = [
  { id: "city",       label: "Місто",    placeholder: "Введіть ваше місто" },
  { id: "region",     label: "Область",  placeholder: "Введіть вашу область" },
  { id: "street",     label: "Вулиця",   placeholder: "Введіть вашу вулицю" },
  { id: "build",      label: "Будинок",  placeholder: "Введіть номер будинку" },
  { id: "apartament", label: "Квартира", placeholder: "Введіть номер квартири" },
  { id: "floor",      label: "Поверх",   placeholder: "Введіть поверх" },
];

const deliveryOptions = [
  { id: "pickup",  label: "Самовивіз з магазину" },
  { id: "courier", label: "Курʼєрська доставка" },
];

const DeliveryInfoForm: React.FC<Props> = ({ values, errors, onChange }) => {
  return (
    <section>
      <div className="mt-[64px]">
        <h3 className="block text-[24px] leading-[120%]">Інформація про доставку</h3>
        <div className="mt-6 flex items-center justify-between gap-x-2">
          {deliveryOptions.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-x-3">
              <input
                id={id}
                type="checkbox"
                checked={values.deliveryMethod === id}
                onChange={() => onChange("deliveryMethod", id)}
                className="h-6 w-6"
              />
              <label htmlFor={id} className="text-[20px] leading-[120%]">{label}</label>
            </div>
          ))}
        </div>
        <p className="mt-5 text-accent">Магазин працює ПН - НД: 09:00-20:00</p>
      </div>

      <form
        className={cn(
          "flex w-full flex-col gap-y-[34px] overflow-hidden transition-all duration-700 ease-in-out",
          values.deliveryMethod === "pickup" ? "max-h-0" : "max-h-[1200px]"
        )}
      >
        {inputFields.map(({ id, label, placeholder }) => (
          <div key={id} className="flex w-full flex-col gap-y-[7px]">
            <label htmlFor={id} className="text-[12px] leading-[120%] text-accent">{label}</label>
            <input
              id={id}
              value={values[id as keyof FormValues] as string}
              onChange={(e) => onChange(id, e.target.value)}
              className={cn(
                "h-[43px] w-full border-b-[1px] px-2 py-3 outline-none",
                errors[id] ? "border-red-500" : "border-gray-300"
              )}
              placeholder={placeholder}
            />
            {errors[id] && (
              <span style={{ color: "red" }} className="text-xs">{errors[id]}</span>
            )}
          </div>
        ))}

        {/* Ліфт — radio buttons */}
        <div className="flex flex-col gap-y-3">
          <label className="text-[12px] leading-[120%] text-accent">
            Наявність вантажного ліфта
          </label>
          <div className="flex gap-x-6">
            <label className="flex items-center gap-x-2 cursor-pointer text-[16px]">
              <input
                type="radio"
                name="elevator"
                checked={values.elevator === true}
                onChange={() => onChange("elevator", true)}
                className="w-5 h-5"
              />
              Є
            </label>
            <label className="flex items-center gap-x-2 cursor-pointer text-[16px]">
              <input
                type="radio"
                name="elevator"
                checked={values.elevator === false}
                onChange={() => onChange("elevator", false)}
                className="w-5 h-5"
              />
              Немає
            </label>
          </div>
          {errors.elevator && (
            <span style={{ color: "red" }} className="text-xs">{errors.elevator}</span>
          )}
        </div>
      </form>
    </section>
  );
};

export default DeliveryInfoForm;