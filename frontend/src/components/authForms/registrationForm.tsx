"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Iauthorization } from "../../@types/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { IregisterFormInputs } from "../../@types/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { authService } from "@/services/authService";
import { useAuthContext } from "@/context/AuthContext";

const registerSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Ім'я обов'язкове")
    .matches(/^[\p{L}]+$/u, "Невірне ім'я"),
  second_name: yup
    .string()
    .required("Прізвище обов'язкове")
    .matches(/^[\p{L}]+$/u, "Невірне прізвище"),
  phone: yup
    .string()
    .required("Телефон обов'язковий")
    .matches(/^[+]?[0-9\-() ]{10,15}$/, "Невірний формат телефону"),
  email: yup.string().required("Email обов'язковий").email("Невірний email"),
  password: yup
    .string()
    .required("Пароль обов'язковий")
    .min(8, "Мінімум 8 символів")
    .max(24, "Максимум 24 символи"),
  passwordConfirm: yup
    .string()
    .required("Підтвердження паролю обов'язкове")
    .oneOf([yup.ref("password"), undefined!], "Паролі не співпадають"),
});

const RegisterForm: React.FC<Iauthorization> = ({ setSection, setShowModal }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IregisterFormInputs>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IregisterFormInputs> = async (data) => {
    setServerError(null);
    setLoading(true);
    try {
      await authService.register({
        firstName: data.first_name,
        lastName: data.second_name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      const tokens = await authService.login({ email: data.email, password: data.password });
      login(tokens);
      setShowModal?.(false);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Помилка реєстрації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full max-w-[470px] flex-col gap-y-6 px-6 sm:px-10 pb-6 pt-16 bg-white mx-auto"
    >
      <div
        onClick={() => setShowModal?.(false)}
        className="absolute right-4 top-4 cursor-pointer rounded-[50%] p-2 transition-colors duration-500 hover:bg-grey"
      >
        <Image width={24} height={24} src="/close.svg" className="h-6 w-6" alt="closeIcon" />
      </div>

      <span className="block text-center font-bold leading-[120%]">Зареєструватись</span>

      <div className="flex items-center justify-between gap-x-5">
        <Input {...register("first_name")} type="text" placeholder="Ім'я" error={errors.first_name} required />
        <Input {...register("second_name")} type="text" placeholder="Прізвище" error={errors.second_name} required />
      </div>

      <Input {...register("phone")} type="tel" placeholder="Телефон (+380...)" error={errors.phone} required />

      <Input {...register("email")} type="text" placeholder="Email" error={errors.email} required />

      <div className="relative">
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          error={errors.password}
          required
          autoComplete="on"
        />
        <Image
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
          src={showPassword ? "/open-eye.svg" : "/closed-eye.svg"}
          width={24}
          height={24}
          alt="eye"
        />
      </div>

      <div className="relative">
        <Input
          {...register("passwordConfirm")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Підтвердження паролю"
          error={errors.passwordConfirm}
          required
          autoComplete="on"
        />
        <Image
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          src={showConfirmPassword ? "/open-eye.svg" : "/closed-eye.svg"}
          width={24}
          height={24}
          alt="eye"
        />
      </div>

      {serverError && (
        <p className="text-red-500 text-sm text-center">{serverError}</p>
      )}

      <Button variant="black" className="mt-6 w-full" disabled={loading}>
        {loading ? "Завантаження..." : "зареєструватись"}
      </Button>

      <div className="flex items-center justify-between gap-x-5 text-[12px]">
        <span>Вже маєте аккаунт?</span>
        <a onClick={() => setSection?.(1)} className="cursor-pointer p-[10px] text-[12px] font-bold underline">
          Вхід
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;