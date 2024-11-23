import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/classesMerge';

const buttonsVariants = cva(
  'text-center px-8 py-4 uppercase text-[20px] w-[297px] h-[56px] flex items-center justify-center transition-colors border-[1px] border-white hover:text-accent hover:border-accent active:bg-accent active:text-white',
  {
    variants: {
      variant: {
        default: 'bg-white text-black',
        second: 'bg-transparent text-white',
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
