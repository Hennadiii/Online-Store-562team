"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import * as yup from "yup";
import { Button } from "@/components/ui/button";

const settingsSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().required("email is required").email("invalid email"),
  phone: yup.string().required("phone is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be longer that 8 characters")
    .max(24, "password must be shorter than 24 characters"),
  newPassword: yup
    .string()
    .required("password is required")
    .min(8, "password must be longer that 8 characters")
    .max(24, "password must be shorter than 24 characters"),
  confirmPassword: yup
    .string()
    .required("password is required")
    .min(8, "password must be longer that 8 characters")
    .max(24, "password must be shorter than 24 characters")
    .oneOf([yup.ref("newPassword"), undefined!], "Passwords must match"),
});

const AdminSettingsPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    mode: "onBlur",
  });


  return (
    <section className="rounded-[14px] shadow-2xl border h-screen flex px-[18px] py-[32px] gap-x-[65px] pb-10 mb-10">
      <div>
        <Image
          className="rounded-[50%]"
          width={172}
          height={172}
          alt="profile"
          src="/olena.png"
        />
      </div>

      <form
        className="w-full flex gap-x-[57px] justify-between"
      >
        <div className="flex flex-col gap-y-[34px] w-full">
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Ім’я
            </label>
            <Input
              className="mt-[5px]"
              {...register('name')}
              type="text"
              placeholder="Ім’я"
              name="name"
              error={errors.name}
              required
            />
          </div>
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Email
            </label>
            <Input
              className="mt-[5px]"
              {...register('email')}
              type="text"
              placeholder="Email"
              name="email"
              error={errors.email}
              required
            />
          </div>
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Пароль
            </label>
            <Input
              className="mt-[5px]"
              {...register('password')}
              type="password"
              placeholder="password"
              name="password"
              error={errors.password}
              required
            />
          </div>
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Новий пароль
            </label>
            <Input
              {...register('newPassword')}
              className="mt-[5px]"
              type="text"
              placeholder="Новий пароль"
              name="newPassword"
              error={errors.newPassword}
              required
            />
          </div>
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Підтвердіть новий пароль
            </label>
            <Input
              className="mt-[5px]"
              {...register('confirmPassword')}
              type="text"
              placeholder="Підтвердіть новий пароль"
              name="confirmPassword"
              error={errors.confirmPassword}
              required
            />
          </div>

          <Button type="submit" className="mt-auto" variant="black">
            Зберегти
          </Button>
        </div>

        <div className="w-full flex flex-col gap-y-[34px]">
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Прізвище
            </label>
            <Input
              className="mt-[5px]"
              {...register('lastName')}
              type="text"
              placeholder="Прізвище"
              name="lastName"
              error={errors.lastName}
              required
            />
          </div>
          <div className="h-[62px]">
            <label className="text-[12px] leading-[120%] text-accent">
              Телефон
            </label>
            <Input
              className="mt-[5px]"
              {...register('phone')}
              type="text"
              placeholder="Телефон"
              name="phone"
              error={errors.phone}
              required
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AdminSettingsPage;
