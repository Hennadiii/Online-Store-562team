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

const Loginschema = yup.object().shape({
  email: yup.string().required("email is required").email("invalid email"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be longer that 8 characters")
    .max(24, "password must be shorter than 24 characters"),
});

const LoginForm: React.FC<Iauthorization> = ({
  setSection,
  setShowModal,
  isModal = true,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginFormInputs>({
    resolver: yupResolver(Loginschema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IloginFormInputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "relative flex h-[620px] w-[470px] flex-col  gap-y-7 px-[44px] pb-[52px] pt-[64px]",
        {
          "bg-white": true,
          "bg-transparent": !isModal,
        },
      )}
    >
      {isModal ? (
        <>
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
            Вхід
          </span>
        </>
      ) : (
        <h2 className="text-[24px] leading-[120%] mb-6 ml-1">Ви користувач?</h2>
      )}

      <div className="h-[66px]">
        <label className="text-[12px] leading-[120%] text-accent">Email</label>
        <Input
          className="mt-[5px]"
          {...register("email")}
          type="text"
          placeholder="Email"
          name="email"
          error={errors.email}
          required
        />
      </div>

      <div className="relative h-[66px]">
        <label className="text-[12px] leading-[120%] text-accent">Пароль</label>
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          name="password"
          error={errors.password}
          required
          autoComplete="on"
          className="mt-2"
        />
        <p className="mt-8 text-[12px] text-grey leading-[120%]">
          Пароль повинен містити щонайменше 8 символів. Містити 1 велику літеру
          та 4 цифри
        </p>
        <Image
          className="absolute right-2 top-10 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
          src={showPassword ? "/open-eye.svg" : "/closed-eye.svg"}
          width={24}
          height={24}
          alt="eye"
        />
      </div>
      <a
        onClick={() => {
          if (setSection) {
            setSection(3);
          }
        }}
        className="block w-fit cursor-pointer mt-14 text-[12px] underline"
      >
        Забули пароль?
      </a>
      <Button variant="black" className="w-full">
        ВХІД
      </Button>
      <Button
        type="submit"
        className="flex w-full gap-x-[30px] border-black pl-3 text-[20px]"
      >
        <Image
          width={24}
          height={24}
          className="h-6 w-6"
          src="/google.svg"
          alt="google"
        />{" "}
        увійти через google
      </Button>
      {isModal && (
        <div className="flex items-center justify-between gap-x-5 text-[12px]">
          <span>Ще не маєте аккаунта??</span>
          <a
            onClick={() => {
              if (setSection) {
                setSection(2);
              }
            }}
            className="cursor-pointer p-[10px] text-[12px] font-bold underline"
          >
            Зареєструватись
          </a>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
