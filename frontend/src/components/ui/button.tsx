import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/classesMerge';

const buttonsVariants = cva(
  'py-[10px] font-medium text-[28px] text-center bg-[#1e2426] text-[#f4f4f4] rounded-[10px]',
  {
    variants: {
      variant: {
        small: 'w-[100px]',
        default: 'w-full',
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
