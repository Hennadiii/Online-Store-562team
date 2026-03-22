import { cn } from "@/utils/twMerge";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // Поля адреси — опціональні, тільки для гостя при courier
  city?: string;
  region?: string;
  street?: string;
  house?: string;
  apartment?: string;
  floor?: string;
  hasElevator?: boolean | undefined;
}

interface Props {
  className?: string;
  values: FormValues;
  errors: Record<string, string>;
  onChange: (field: string, value: string | boolean | undefined) => void;
  showAddressFields?: boolean; // true = гість + courier
}

const contactFields = [
  
  { id: "firstName", label: "Імʼя",     placeholder: "Введіть ваше імʼя" },
  { id: "lastName",  label: "Прізвище", placeholder: "Введіть ваше прізвище" },
  { id: "phone",     label: "Телефон",  placeholder: "+ 380 (__) ___ __ __" },
  { id: "email",     label: "Email",    placeholder: "Введіть ваш email" },
];

const addressFields = [
  { id: "city",      label: "Місто",    placeholder: "Наприклад, Київ" },
  { id: "region",    label: "Область",  placeholder: "Київська" },
  { id: "street",    label: "Вулиця",   placeholder: "Назва вулиці" },
  { id: "house",     label: "Будинок",  placeholder: "№ будинку" },
  { id: "apartment", label: "Квартира", placeholder: "№ кв." },
  { id: "floor",     label: "Поверх",   placeholder: "№" },
];

const inputBase = "h-[43px] w-full border-b-[1px] px-2 py-3 outline-none";

const ContactInfoForm: React.FC<Props> = ({
  className, values, errors, onChange, showAddressFields = false,
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-y-[34px]", className)}>

      {/* Контактні поля */}
      {contactFields.map(({ id, label, placeholder }) => (
        <div key={id} className="flex w-full flex-col gap-y-[7px]">
          <label htmlFor={id} className="text-[12px] leading-[120%] text-accent">
            {label}
          </label>
          <input
            id={id}
            value={(values[id as keyof FormValues] as string) ?? ""}
            onChange={(e) => onChange(id, e.target.value)}
            className={cn(inputBase, errors[id] ? "border-red-500" : "border-gray-300")}
            placeholder={placeholder}
          />
          {errors[id] && (
            <span style={{ color: "red" }} className="text-xs">{errors[id]}</span>
          )}
        </div>
      ))}

      {/* Поля адреси — тільки для гостя при courier */}
      {showAddressFields && (
        <>
          <div className="border-t border-gray-200 pt-2">
            <p className="text-[12px] text-accent">Адреса доставки</p>
          </div>

          {addressFields.map(({ id, label, placeholder }) => (
            <div key={id} className="flex w-full flex-col gap-y-[7px]">
              <label htmlFor={id} className="text-[12px] leading-[120%] text-accent">
                {label}
              </label>
              <input
                id={id}
                value={(values[id as keyof FormValues] as string) ?? ""}
                onChange={(e) => onChange(id, e.target.value)}
                className={cn(inputBase, errors[id] ? "border-red-500" : "border-gray-300")}
                placeholder={placeholder}
              />
              {errors[id] && (
                <span style={{ color: "red" }} className="text-xs">{errors[id]}</span>
              )}
            </div>
          ))}

          {/* Ліфт */}
          <div className="flex flex-col gap-y-[7px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Вантажний ліфт
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="hasElevator"
                  checked={values.hasElevator === true}
                  onChange={() => onChange("hasElevator", true)}
                  className="w-4 h-4"
                />
                Є
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="hasElevator"
                  checked={values.hasElevator === false}
                  onChange={() => onChange("hasElevator", false)}
                  className="w-4 h-4"
                />
                Немає
              </label>
            </div>
            {errors.hasElevator && (
              <span style={{ color: "red" }} className="text-xs">{errors.hasElevator}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ContactInfoForm;