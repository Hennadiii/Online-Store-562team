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
import { cn } from "@/utils/twMerge";

const registerForm = yup.object().shape({
  first_name: yup
    .string()
    .required("first name is requird")
    .matches(/^[\p{L}]+$/u, "invalid first name"),
  second_name: yup
    .string()
    .required("second name is requird")
    .matches(/^[\p{L}]+$/u, "invalid second name"),
  email: yup.string().required("email is required").email("invalid email"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be longer that 8 characters")
    .max(24, "password must be shorter than 24 characters"),
  passwordConfirm: yup
    .string()
    .required("password is required")
    .oneOf([yup.ref("password"), undefined!], "Passwords must match"),
});

const RegisterForm: React.FC<Iauthorization> = ({
  setSection,
  setShowModal,
  isModal = true,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IregisterFormInputs>({
    resolver: yupResolver(registerForm),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[470px] flex-col gap-y-6 px-[44px] pb-[22px] pt-16 bg-white"
    >
      <div
        onClick={() => {
          if (setShowModal) {
            setShowModal(false);
          }
        }}
        className="absolute right-4 top-4 cursor-pointer rounded-[50%] p-2 transition-colors duration-500 hover:bg-grey"
      >
        <Image
          width={24}
          height={24}
          src="/close.svg"
          className="h-6 w-6"
          alt="closeIcon"
        />
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

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          name="password"
          register={register}
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
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Підтвердження паролю"
          name="passwordConfirm"
          register={register}
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
      <Button variant="black" className="mt-6 w-full">
        зареєструватись
      </Button>
      <div className="flex items-center justify-between gap-x-5 text-[12px]">
        <span>Вже маєте аккаунт?</span>
        <a
          onClick={() => {
            if (setSection) {
              setSection(1);
            }
          }}
          className="cursor-pointer p-[10px] text-[12px] font-bold underline"
        >
          Вхід
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
