"use client";

import { Button } from "@/components/ui/button";

const AddressForm = () => {
  return (
    <form className="flex flex-col gap-4">
      {[
        { label: "Імʼя", placeholder: "Введіть імʼя отримувача" },
        { label: "Прізвище", placeholder: "Введіть прізвище отримувача" },
        { label: "Телефон", placeholder: "+380 (__) ___ __ __" },
        { label: "Місто", placeholder: "Введіть місто отримувача" },
        { label: "Область", placeholder: "Введіть область отримувача" },
        { label: "Вулиця", placeholder: "Введіть вулицю отримувача" },
        { label: "Номер будинку", placeholder: "Введіть номер будинку" },
        { label: "Квартира / Етаж", placeholder: "Введіть номер квартири / поверху" },
        { label: "Відділення Нової пошти", placeholder: "Введіть відділення отримувача" },
      ].map((field) => (
        <div key={field.label} className="flex flex-col gap-1">
          <label className="text-[12px] text-accent">{field.label}</label>
          <input
            className="h-[41px] p-2 border-b border-black w-full max-w-[393px]"
            placeholder={field.placeholder}
          />
        </div>
      ))}

      <Button className="mt-4 w-full max-w-[200px] border-black bg-black text-white hover:bg-white hover:text-black">
        Зберегти
      </Button>
    </form>
  );
};

export default AddressForm;