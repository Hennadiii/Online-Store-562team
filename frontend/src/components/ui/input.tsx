import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/classesMerge';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

const selectorVariants = cva(
  'border-[2px] rounded-[10px] border-[#e3e8ee] px-[22px] h-[50px] border-axcent focus:outline-none',
  {
    variants: {
      variant: {
        default: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof selectorVariants> {
  // register: any;
  // name: any;
  register: UseFormRegister<any>;
  name: 'email' | 'password' | 'first_name' | 'second_name' | 'passwordConfirm';
  error: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({
  className,
  variant,
  name,
  register,
  error,
  ...props
}) => {
  return (
    <div className="relative mb-2">
      <input
        className={cn(selectorVariants({ variant, className }))}
        {...props}
        {...register(name)}
      />
      <p
        className={`text-red ${error ? 'opacity-100' : 'opacity-0'} absolute bottom-[-25px] text-[13px] transition-opacity delay-75 duration-150 ease-in-out`}
      >
        {error?.message}
      </p>
    </div>
  );
};

export { Input, selectorVariants };
