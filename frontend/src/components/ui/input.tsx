import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/twMerge";
import { FieldError } from "react-hook-form";


const selectorVariants = cva(
  "h-[43px] bg-transparent border-b px-2 focus:outline-none transition-colors duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "w-full border-black text-black",
        error: "w-full border-red text-red",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof selectorVariants> {
  name?: string;
  error?: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({
  className,
  variant,
  error,
  ...props
}) => {
  return (
    <div className="relative mb-1">
      <input
        className={cn(
          selectorVariants({
            variant: variant ?? (error ? "error" : "default"),
          }),
          className,
        )}
        {...props}
      />
      <p
        className={`${
          error ? "opacity-100 text-red" : "opacity-0"
        } absolute bottom-[-25px] text-[12px] transition-opacity duration-300 ease-in-out`}
      >
        {error?.message}
      </p>
    </div>
  );
};

export { Input, selectorVariants };
