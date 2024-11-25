import { Link } from 'react-router-dom';
import { IsetSection } from '../../@types/modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import * as yup from 'yup';
import { IloginFormInputs } from '../../@types/forms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

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
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-[527px] w-[470px] flex-col gap-y-6 px-[44px] pb-[52px] pt-16"
    >
      <img src="close.svg" className="absolute right-6 top-6 h-6 w-6" />
      <span className="block text-center font-bold leading-[120%]">Вхід</span>

      <Input
        register={register}
        type="text"
        className=""
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
      <a
        onClick={() => setSection(3)}
        className="block w-fit cursor-pointer text-[12px] underline"
      >
        Забули пароль?
      </a>
      <Button variant="black" className="w-full">
        ВХІД
      </Button>
      <Button
        type="submit"
        className="border-black flex w-full gap-x-[30px] pl-3 text-[20px]"
      >
        <img className="h-6 w-6" src="google.svg" /> увійти через google
      </Button>
      <div className="flex items-center justify-between gap-x-5 text-[12px]">
        <span>Ще не маєте аккаунта??</span>
        <a
          onClick={() => setSection(2)}
          className="cursor-pointer p-[10px] text-[12px] font-bold underline"
        >
          Зареєструватись
        </a>
      </div>
    </motion.form>
  );
};

export default LoginForm;
