"use client";

import { Iauthorization } from "../../@types/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as yup from "yup";
import { IloginFormInputs } from "../../@types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/utils/twMerge";

const LoginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters"),
});

const LoginForm: React.FC<Iauthorization> = ({
  setSection,
  setShowModal,
  isModal = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginFormInputs>({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IloginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "relative flex flex-col gap-6 bg-white w-full max-w-[470px] h-auto rounded-lg p-6 sm:p-8",
        { "shadow-lg": isModal }
      )}
    >
      {/* Кнопка закрытия */}
      {isModal && (
        <div
          onClick={() => setShowModal && setShowModal(false)}
          className="absolute right-4 top-4 cursor-pointer p-2 rounded-full hover:bg-grey transition-colors duration-300"
        >
          <Image width={24} height={24} src="/close.svg" alt="close" />
        </div>
      )}

      {/* Заголовок */}
      <span className="block text-center font-bold text-lg">Вхід</span>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-[12px] text-accent mb-1">Email</label>
        <Input {...register("email")} placeholder="Email" error={errors.email} />
      </div>

      {/* Пароль */}
      <div className="relative flex flex-col">
        <label className="text-[12px] text-accent mb-1">Пароль</label>
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          error={errors.password}
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

      <a
        onClick={() => setSection && setSection(3)}
        className="text-[12px] underline mt-2 cursor-pointer"
      >
        Забули пароль?
      </a>

      {/* Кнопка ВХІД */}
      <Button type="submit" variant="black" className="w-full mt-4">
        ВХІД
      </Button>

      {/* Соц. вход (Google) */}
      <Button
        type="button"
        className="flex w-full gap-x-3 border-black pl-3 mt-2"
      >
        <Image width={24} height={24} src="/google.svg" alt="google" />
        Увійти через Google
      </Button>

      {/* Переключение на регистрацию */}
      {isModal && (
        <div className="flex justify-between text-[12px] mt-4">
          <span>Ще не маєте аккаунта?</span>
          <a
            onClick={() => setSection && setSection(2)}
            className="cursor-pointer font-bold underline"
          >
            Зареєструватись
          </a>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
