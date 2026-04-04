import React, { useState } from "react";

export interface AddressFormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  region: string;
  street: string;
  house: string;
  apartment?: string;
  floor: string;
  hasElevator: boolean;
}

export const isAddressValid = (data: AddressFormData) =>
  Boolean(
    data.firstName.trim() &&
    data.lastName.trim() &&
    data.phone.trim() &&
    data.city.trim() &&
    data.region.trim() &&
    data.street.trim() &&
    data.house.trim()
  );

export const EMPTY_ADDRESS: AddressFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  region: "",
  street: "",
  house: "",
  apartment: "",
  floor: "",
  hasElevator: false,
};

// ── Валідатори ──────────────────────────────────────────────────────────────

const validators: Partial<Record<keyof AddressFormData, (v: string) => string>> = {
  firstName: (v) => {
    if (!v.trim()) return "Введіть імʼя";
    if (v.trim().length < 2) return "Мінімум 2 символи";
    return "";
  },
  lastName: (v) => {
    if (!v.trim()) return "Введіть прізвище";
    if (v.trim().length < 2) return "Мінімум 2 символи";
    return "";
  },
  phone: (v) => {
    if (!v.trim()) return "Введіть телефон";
    if (!/^\+380\d{9}$/.test(v.trim())) return "Формат: +380XXXXXXXXX";
    return "";
  },
  city: (v) => {
    if (!v.trim()) return "Введіть місто";
    if (/^\d+$/.test(v.trim())) return "Місто не може складатись лише з цифр";
    return "";
  },
  region: (v) => {
    if (!v.trim()) return "Введіть область";
    if (/^\d+$/.test(v.trim())) return "Область не може складатись лише з цифр";
    return "";
  },
  street: (v) => {
    if (!v.trim()) return "Введіть вулицю";
    if (!/[a-zA-Zа-яА-ЯіІїЇєЄґҐ]/.test(v)) return "Вулиця повинна містити літери";
    return "";
  },
  house: (v) => {
    if (!v.trim()) return "Введіть будинок";
    if (!/^[\dA-Za-zА-ЯҐІЇЄа-яґіїє/\-]+$/.test(v.trim())) return "Недопустимі символи";
    return "";
  },
  floor: (v) => (!v?.trim() ? "Введіть поверх" : ""),
};

// ── Фільтр вводу для телефону ───────────────────────────────────────────────
// Дозволяє тільки: + на початку, далі тільки цифри, максимум 13 символів (+380XXXXXXXXX)
const filterPhoneInput = (raw: string): string => {
  if (!raw) return "";
  // Залишаємо + тільки на першій позиції, решта — тільки цифри
  let result = "";
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (i === 0 && ch === "+") { result += ch; continue; }
    if (/\d/.test(ch)) { result += ch; }
    // все інше — ігноруємо
  }
  // Максимум 13 символів: +380XXXXXXXXX
  return result.slice(0, 13);
};

const inputBase =
  "w-full h-[44px] px-3 border rounded-lg bg-white transition-colors duration-200 focus:outline-none text-sm hover:border-gray-400 focus:border-black";

// ── Field ───────────────────────────────────────────────────────────────────

interface FieldProps {
  field: keyof AddressFormData;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (field: string, value: string | boolean | undefined) => void;
  onValidate: (field: keyof AddressFormData, value: string) => void;
  inputFilter?: (v: string) => string; // ← опційний фільтр вводу
}

const Field: React.FC<FieldProps> = ({
  field, label, placeholder, type, value, error,
  onChange, onValidate, inputFilter,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-gray-600 font-medium">{label}</label>
    <input
      value={value}
      onChange={(e) => {
        const raw = e.target.value;
        const filtered = inputFilter ? inputFilter(raw) : raw;
        onChange(field, filtered);
        onValidate(field, filtered);
      }}
      placeholder={placeholder}
      type={type}
      className={`${inputBase} ${error ? "border-red" : "border-gray-300"}`}
    />
    {error && <span className="text-xs text-red">{error}</span>}
  </div>
);

// ── Props ───────────────────────────────────────────────────────────────────

interface Props {
  data: AddressFormData;
  onChange: (field: string, value: string | boolean | undefined) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel: string;
  isValid: boolean;
  saveCheckbox?: boolean;
  onSaveToggle?: (val: boolean) => void;
  saveValue?: boolean;
}

const AddressForm: React.FC<Props> = ({
  data, onChange, onSubmit, onCancel, submitLabel, isValid,
  saveCheckbox, onSaveToggle, saveValue,
}) => {
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});

  const handleValidate = (field: keyof AddressFormData, value: string) => {
    const validator = validators[field];
    if (!validator) return;
    const error = validator(value);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    const newErrors: Partial<Record<keyof AddressFormData, string>> = {};
    let hasErrors = false;

    (Object.keys(validators) as (keyof AddressFormData)[]).forEach((field) => {
      const value = (data[field] as string) ?? "";
      const error = validators[field]!(value);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setFieldErrors(newErrors);
    if (hasErrors) return;
    onSubmit();
  };

  const get = (field: keyof AddressFormData) => (data[field] as string) ?? "";

  return (
    <div className="flex flex-col gap-3">

      {/* Імʼя + Прізвище */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field field="firstName" label="Імʼя"     placeholder="Введіть імʼя"
          value={get("firstName")} error={fieldErrors.firstName}
          onChange={onChange} onValidate={handleValidate} />
        <Field field="lastName"  label="Прізвище" placeholder="Введіть прізвище"
          value={get("lastName")}  error={fieldErrors.lastName}
          onChange={onChange} onValidate={handleValidate} />
      </div>

      {/* Телефон + Місто + Область */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field
          field="phone" label="Телефон" placeholder="+380XXXXXXXXX" type="tel"
          value={get("phone")} error={fieldErrors.phone}
          onChange={onChange} onValidate={handleValidate}
          inputFilter={filterPhoneInput} // ← фільтр тільки для телефону
        />
        <Field field="city"   label="Місто"   placeholder="Наприклад, Київ"
          value={get("city")}   error={fieldErrors.city}
          onChange={onChange} onValidate={handleValidate} />
        <Field field="region" label="Область" placeholder="Київська"
          value={get("region")} error={fieldErrors.region}
          onChange={onChange} onValidate={handleValidate} />
      </div>

      {/* Вулиця + Поверх */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Field field="street" label="Вулиця" placeholder="Назва вулиці"
            value={get("street")} error={fieldErrors.street}
            onChange={onChange} onValidate={handleValidate} />
        </div>
        <Field field="floor" label="Поверх" placeholder="№"
          value={get("floor")} error={fieldErrors.floor}
          onChange={onChange} onValidate={handleValidate} />
      </div>

      {/* Будинок + Квартира */}
      <div className="grid grid-cols-2 gap-3">
        <Field field="house"     label="Будинок"  placeholder="№ будинку"
          value={get("house")}     error={fieldErrors.house}
          onChange={onChange} onValidate={handleValidate} />
        <Field field="apartment" label="Квартира" placeholder="№ кв."
          value={get("apartment")} error={fieldErrors.apartment}
          onChange={onChange} onValidate={handleValidate} />
      </div>

      {/* Ліфт */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-600 font-medium">Вантажний ліфт</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio" name="hasElevator"
              checked={data.hasElevator === true}
              onChange={() => onChange("hasElevator", true)}
              className="w-4 h-4"
            />
            Є
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio" name="hasElevator"
              checked={data.hasElevator === false}
              onChange={() => onChange("hasElevator", false)}
              className="w-4 h-4"
            />
            Немає
          </label>
        </div>
      </div>

      {/* Чекбокс "Зберегти" — тільки в checkout */}
      {saveCheckbox && (
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 mt-1">
          <input
            type="checkbox"
            checked={saveValue ?? false}
            onChange={(e) => onSaveToggle?.(e.target.checked)}
            className="w-4 h-4"
          />
          Зберегти цю адресу
        </label>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button" onClick={onCancel}
            className="w-full sm:w-auto px-6 h-[44px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          >
            Скасувати
          </button>
        )}
        <button
          type="button" onClick={handleSubmit} disabled={!isValid}
          className={`w-full sm:w-auto px-8 h-[44px] rounded-xl text-sm font-medium transition-all duration-200 ${
            isValid ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;