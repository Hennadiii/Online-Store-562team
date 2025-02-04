import { cn } from "@/utils/twMerge";

const inputFields = [
  { id: "lastName", label: "Прізвище", placeholder: "Введіть ваше прізвище" },
  { id: "firstName", label: "Імʼя", placeholder: "Введіть ваше імʼя" },
  { id: "phone", label: "Телефон", placeholder: "+ 380 (__) ___ __ __" },
  { id: "email", label: "Email", placeholder: "Введіть ваш email" },
];

type props = { className?: string };

const ContactInfoForm: React.FC<props> = ({ className }) => {
  return (
    <form className={cn("flex w-full flex-col gap-y-[34px]", className)}>
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
    </form>
  );
};

export default ContactInfoForm;
