"use client";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/twMerge";

const buttonsVariants = cva(
  "text-center px-8 py-4 uppercase text-[20px] w-full h-[56px] duration-500 flex items-center justify-center transition-colors border-[1px] border-white hover:text-accent hover:border-accent active:bg-accent active:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",

  {
    variants: {
      variant: {
        default: "bg-white text-black",
        second: "bg-transparent text-white",
        black:
          "text-white bg-black hover:text-black hover:bg-white border-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonsVariants> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // <- добавили button
}

const Button: React.FC<ButtonProps> = ({ className, variant, ...props }) => {
  return (
    <button
      className={cn(buttonsVariants({ variant, className })) }
      {...props}
    />
  );
};

export { Button, buttonsVariants };
