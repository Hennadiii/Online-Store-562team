import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/classesMerge';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IloginFormInputs, iRegisterFormInputs } from '../../@types/forms';

const selectorVariants = cva(
  'h-[40px] border-b-[1px] px-2 focus:outline-none',
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
  register:
    | UseFormRegister<IloginFormInputs | iRegisterFormInputs>
    | UseFormRegister<iRegisterFormInputs>;
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
  console.log(error);

  return (
    <div className="relative mb-1">
      <input
        className={cn(selectorVariants({ variant, className }))}
        {...props}
        {...register(name)}
      />
      <p
        className={`text-red ${error ? 'opacity-100' : 'opacity-0'} absolute bottom-[-25px] text-[12px] transition-opacity delay-150 duration-300 ease-in-out`}
      >
        {error?.message}
      </p>
    </div>
  );
};

export { Input, selectorVariants };
