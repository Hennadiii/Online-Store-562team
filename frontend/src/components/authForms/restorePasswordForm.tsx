"use client";

import { Iauthorization } from "@/@types/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as yup from "yup";
import { IrestorePasswordInputs } from "../../@types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

const restorePasswordSchema = yup.object().shape({
  email: yup.string().required("Email обов'язковий").email("Невірний email"),
});

const RestorePasswordForm: React.FC<Iauthorization> = ({
  setSection,
  setShowModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IrestorePasswordInputs>({
    resolver: yupResolver(restorePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IrestorePasswordInputs> = (data) =>
    console.log("Restore email:", data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full max-w-[470px] bg-white 
                 px-6 sm:px-[44px] 
                 pt-14 sm:pt-16 
                 pb-10 sm:pb-[52px] 
                 flex flex-col gap-y-6"
    >
      {/* Close button */}
      <div
        onClick={() => setShowModal?.(false)}
        className="absolute right-4 top-4 cursor-pointer rounded-full p-2 transition hover:bg-grey"
      >
        <Image
          width={24}
          height={24}
          src="/close.svg"
          className="h-6 w-6"
          alt="close"
        />
      </div>

      {/* Title */}
      <span className="text-center text-lg font-bold">
        Відновлення пароля
      </span>

      {/* Description */}
      <p className="text-center text-sm text-gray-500">
        Введіть ваш email і ми надішлемо інструкції для відновлення пароля
      </p>

      {/* Email input */}
      <Input
        {...register("email")}
        type="email"
        placeholder="Email"
        error={errors.email}
      />

      {/* Submit button */}
      <Button variant="black" className="w-full">
        Надіслати
      </Button>

      {/* Back to login */}
      <div className="text-center text-sm">
        <span>Згадали пароль?</span>
        <span
          onClick={() => setSection?.(1)}
          className="ml-2 cursor-pointer font-bold underline"
        >
          Вхід
        </span>
      </div>
    </form>
  );
};

export default RestorePasswordForm;
