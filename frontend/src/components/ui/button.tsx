import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/classesMerge';

const buttonsVariants = cva(
  'text-center bg-[#1e2426] text-[#f4f4f4] rounded-[10px] hover:text-main hover:bg-[#fff] border-2 transition-colors',
  {
    variants: {
      variant: {
        small: 'w-[300px] text-[20px] py-[10px]',
        default: 'w-full py-[10px] text-[28px]',
        big: 'w-[200px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonsVariants> {
  disabled?: boolean;
  type?: 'submit';
}

const Button: React.FC<ButtonProps> = ({ className, variant, ...props }) => {
  return (
    <button
      className={cn(buttonsVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Button, buttonsVariants };
