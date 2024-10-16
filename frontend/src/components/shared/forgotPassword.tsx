import { IsetSection } from '../../@types/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

let forgotPasswordScheme = yup.object().shape({
  email: yup.string().required('email is required').email('invalid email'),
});

const ForgotPassword: React.FC<IsetSection> = ({ setSection }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(forgotPasswordScheme),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[450px] p-10">
      <h1 className="text-center text-[20px] font-bold">Forgot password?</h1>
      <p className="mt-2 text-center text-[14px]">
        Remember your password?{' '}
        <a
          onClick={() => setSection(1)}
          className="text-blue-300 cursor-pointer text-[#2563EB] decoration-2 hover:underline"
        >
          Login here
        </a>
      </p>

      <div className="mt-6">
        <label className="text-[13px] font-bold">Email address</label>
        <Input
          className="mt-2"
          placeholder="enter your email"
          name="email"
          register={register}
          error={errors.email}
        />
      </div>
      <Button className="mt-10 text-[16px]">Reset password</Button>
    </form>
  );
};

export default ForgotPassword;
