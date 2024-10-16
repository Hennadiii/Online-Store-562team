import { Link } from 'react-router-dom';
import { IsetSection } from '../../@types/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import * as yup from 'yup';
import { IloginFormInputs } from '../../@types/forms';
import { SubmitHandler, useForm } from 'react-hook-form';

let Loginschema = yup.object().shape({
  email: yup.string().required('email is required').email('invalid email'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be longer that 8 characters')
    .max(24, 'password must be shorter than 24 characters'),
});

const LoginForm: React.FC<IsetSection> = ({ setSection }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IloginFormInputs>({
    resolver: yupResolver(Loginschema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IloginFormInputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-5 p-10"
    >
      <h1 className="text-center text-[24px]">
        Login to your personal account
      </h1>
      <div className="relative mb-4">
        <Input
          register={register}
          type="text"
          placeholder="email"
          name="email"
          error={errors.email}
          required
        />
      </div>
      <div className="relative mb-2">
        <Input
          type="password"
          placeholder="password"
          name="password"
          register={register}
          error={errors.password}
          required
          autoComplete="on"
        />
      </div>
      <a
        onClick={() => setSection(3)}
        className="w-fit cursor-pointer text-axcent underline"
      >
        Forgot password?
      </a>
      <Button className="text-[20px]">Sign in</Button>
      <hr className="bg-black h-[2px] w-full" />
      <Button
        type="submit"
        className="flex items-center justify-center gap-x-3 text-[20px]"
      >
        <img className="h-8 w-8" src="google.svg" /> Login With Google
      </Button>
      <hr className="bg-black h-[2px] w-full" />
      <div className="flex items-center gap-x-5">
        <span>Have no account?</span>
        <a
          onClick={() => setSection(2)}
          className="cursor-pointer font-bold underline"
        >
          Register
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
