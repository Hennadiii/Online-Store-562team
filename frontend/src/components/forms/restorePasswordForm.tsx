"use client";
import { IsetSection } from "../../@types/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import * as yup from "yup";
import { IrestorePasswordInputs } from "../../@types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

const restorePasswordSchema = yup.object().shape({
  email: yup.string().required("email is required").email("invalid email"),
});

const RestorePasswordForm: React.FC<IsetSection> = ({
  setSection,
  setShowModal,
}) => {
  const { handleSubmit } = useForm<IrestorePasswordInputs>({
    resolver: yupResolver(restorePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IrestorePasswordInputs> = (data) =>
    console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-[527px] w-[470px] flex-col gap-y-6 bg-white px-[44px] pb-[52px] pt-16"
    >
      <div
        onClick={() => setShowModal(false)}
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
      <span className="block text-center font-bold leading-[120%]">Вхід</span>
      {/* 
      <Input
        register={register}
        type="text"
        className=""
        placeholder="Email"
        name="email"
        error={errors.email}
        required
      /> */}

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
      <div className="flex items-center justify-between gap-x-5 text-[12px]">
        <span>Ще не маєте аккаунта??</span>
        <a
          onClick={() => setSection(2)}
          className="cursor-pointer p-[10px] text-[12px] font-bold underline"
        >
          Зареєструватись
        </a>
      </div>
    </form>
  );
};

export default RestorePasswordForm;
