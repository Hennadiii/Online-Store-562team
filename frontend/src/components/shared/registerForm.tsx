import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { IsetSection } from '../../@types/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { iRegisterFormInputs } from '../../@types/forms';

let registerForm = yup.object().shape({
  first_name: yup
    .string()
    .required('first name is requird')
    .matches(/^[A-Za-z ]*$/, 'invalid first name'),
  second_name: yup
    .string()
    .required('second name is requird')
    .matches(/^[A-Za-z ]*$/, 'invalid second name'),
  email: yup.string().required('email is required').email('invalid email'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be longer that 8 characters')
    .max(24, 'password must be shorter than 24 characters'),
  passwordConfirm: yup
    .string()
    .required('password is required')
    .oneOf([yup.ref('password'), undefined!], 'Passwords must match'),
});

const RegisterForm: React.FC<IsetSection> = ({ setSection }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<iRegisterFormInputs>({
    resolver: yupResolver(registerForm),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-[600px]">
      <img className="max-h-full max-w-[483px]" src="regLogo.svg" alt="logo" />
      <div className="flex w-[500px] flex-col gap-y-6 p-10">
        <h1 className="text-[32px]">Registration</h1>
        <div className="flex items-center gap-x-2">
          <Input
            register={register}
            name="first_name"
            placeholder="first name"
            error={errors.first_name}
          />
          <Input
            register={register}
            name="second_name"
            placeholder="second name"
            error={errors.second_name}
          />
        </div>
        <Input
          error={errors.email}
          register={register}
          name="email"
          placeholder="email"
        />
        <Input
          error={errors.password}
          register={register}
          name="password"
          placeholder="password"
          type="password"
        />
        <Input
          register={register}
          error={errors.passwordConfirm}
          name="passwordConfirm"
          placeholder="confirm password"
          type="password"
        />
        <Button className="mt-4">Register</Button>
        <div className="flex items-center gap-x-5">
          <span>Already have an account?</span>
          <a
            onClick={() => setSection(1)}
            className="cursor-pointer font-bold underline"
          >
            Sign in
          </a>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
