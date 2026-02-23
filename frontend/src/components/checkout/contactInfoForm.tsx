import { cn } from "@/utils/twMerge";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface Props {
  className?: string;
  values: FormValues;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const inputFields = [
  { id: "lastName", label: "Прізвище", placeholder: "Введіть ваше прізвище" },
  { id: "firstName", label: "Імʼя", placeholder: "Введіть ваше імʼя" },
  { id: "phone", label: "Телефон", placeholder: "+ 380 (__) ___ __ __" },
  { id: "email", label: "Email", placeholder: "Введіть ваш email" },
];

const ContactInfoForm: React.FC<Props> = ({ className, values, errors, onChange }) => {
  return (
    <form className={cn("flex w-full flex-col gap-y-[34px]", className)}>
      {inputFields.map(({ id, label, placeholder }) => (
        <div key={id} className="flex w-full flex-col gap-y-[7px]">
          <label htmlFor={id} className="text-[12px] leading-[120%] text-accent">
            {label}
          </label>
          <input
            id={id}
            value={values[id as keyof FormValues]}
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
    </form>
  );
};

export default ContactInfoForm;