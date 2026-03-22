import React from "react";


export interface AddressFormData {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    region: string;
    street: string;
    house: string;
    apartment?: string;
    floor?: string;
    hasElevator?: boolean;
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
    hasElevator: undefined,
  };  

const inputBase =
  "w-full h-[44px] px-3 border rounded-lg bg-white transition-colors duration-200 focus:outline-none text-sm border-gray-300 hover:border-gray-400 focus:border-black";

// ── Field винесено НАЗОВНІ ──────────────────────────────────────────────────
interface FieldProps {
  field: keyof AddressFormData;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (field: string, value: string | boolean | undefined) => void;
}

const Field: React.FC<FieldProps> = ({ field, label, placeholder, type, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-gray-600 font-medium">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      type={type}
      className={inputBase}
    />
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
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field field="firstName" label="Імʼя"     placeholder="Введіть імʼя"     value={data.firstName} onChange={onChange} />
        <Field field="lastName"  label="Прізвище" placeholder="Введіть прізвище" value={data.lastName}  onChange={onChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field field="phone"  label="Телефон" placeholder="+380XXXXXXXXX" type="tel" value={data.phone}  onChange={onChange} />
        <Field field="city"   label="Місто"   placeholder="Наприклад, Київ"        value={data.city}   onChange={onChange} />
        <Field field="region" label="Область" placeholder="Київська"               value={data.region} onChange={onChange} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Field field="street" label="Вулиця" placeholder="Назва вулиці" value={data.street} onChange={onChange} />
        </div>
        <Field field="floor" label="Поверх" placeholder="№" value={data.floor ?? ""} onChange={onChange} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field field="house"     label="Будинок"  placeholder="№ будинку" value={data.house}          onChange={onChange} />
        <Field field="apartment" label="Квартира" placeholder="№ кв."     value={data.apartment ?? ""} onChange={onChange} />
      </div>

      {/* Ліфт */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-600 font-medium">Вантажний ліфт</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="hasElevator"
              checked={data.hasElevator === true}
              onChange={() => onChange("hasElevator", true)}
              className="w-4 h-4"
            />
            Є
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="hasElevator"
              checked={data.hasElevator === false}
              onChange={() => onChange("hasElevator", false)}
              className="w-4 h-4"
            />
            Немає
          </label>
        </div>
      </div>

      {/* Зберегти checkbox — тільки в checkout */}
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
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 h-[44px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          >
            Скасувати
          </button>
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full sm:w-auto px-8 h-[44px] rounded-xl text-sm font-medium transition-all duration-200 ${
            isValid
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;