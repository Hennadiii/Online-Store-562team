import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { IsetSection } from '../../@types/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { iRegisterFormInputs } from '../../@types/forms';
import { motion } from 'framer-motion';

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

const RegisterForm: React.FC<IsetSection> = ({ setSection, setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterFormInputs>({
    resolver: yupResolver(registerForm),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    console.log(data);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[470px] flex-col gap-y-6 bg-white px-[44px] pb-[22px] pt-16"
    >
      <div
        onClick={() => setShowModal(false)}
        className="absolute right-4 top-4 cursor-pointer rounded-[50%] p-2 transition-colors duration-500 hover:bg-grey"
      >
        <img src="close.svg" className="h-6 w-6" alt="closeIcon" />
      </div>
      <span className="block text-center font-bold leading-[120%]">
        Зареєструватись
      </span>

      <div className="flex items-center justify-between gap-x-5">
        <Input
          register={register}
          type="text"
          placeholder="Ім'я"
          name="first_name"
          error={errors.first_name}
          required
        />

        <Input
          register={register}
          type="text"
          placeholder="Прізвище"
          name="second_name"
          error={errors.second_name}
          required
        />
      </div>

      <Input
        register={register}
        type="text"
        placeholder="Email"
        name="email"
        error={errors.email}
        required
      />

      <Input
        type="password"
        placeholder="Пароль"
        name="password"
        register={register}
        error={errors.password}
        required
        autoComplete="on"
      />

      <Input
        type="password"
        placeholder="Підтвердження паролю"
        name="passwordConfirm"
        register={register}
        error={errors.passwordConfirm}
        required
        autoComplete="on"
      />
      <Button variant="black" className="mt-6 w-full">
        зареєструватись
      </Button>
      <div className="flex items-center justify-between gap-x-5 text-[12px]">
        <span>Вже маєте аккаунт?</span>
        <a
          onClick={() => setSection(1)}
          className="cursor-pointer p-[10px] text-[12px] font-bold underline"
        >
          Вхід
        </a>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
