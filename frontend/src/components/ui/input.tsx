import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/classesMerge';

const selectorVariants = cva(
  'border-[2px] rounded-[10px] border-[#e3e8ee] px-[22px] h-[60px] border-axcent focus:outline-none',
  {
    variants: {
      variant: {
        default: 'w-[500px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof selectorVariants> {
  //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   value: string;
}

const Input: React.FC<ButtonProps> = ({ className, variant, ...props }) => {
  return (
    <input
      className={cn(selectorVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Input, selectorVariants };
