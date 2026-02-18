"use client";
import LoginForm from "@/components/authForms/loginForm";

import { Button } from "@/components/ui/button";
import SearchIcon from "@/assets/search.svg";
import Image from "next/image";

const AuthorizationPage = () => {
  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-x-hidden pb-[32px]">
      <div className="px-80px">
       
      </div>

      <div className="flex mt-[13px]">
        <section className="max-w-[720px] w-full bg-lightGrey h-screen pl-9 pt-[55px]">
          <LoginForm isModal={false} />
        </section>
        <section className="max-w-[720px] w-full bg-accent h-screen">
          <h3 className="text-[24px] text-white text-center pt-[130px]">
            Це ваш перший візит?
          </h3>
          <Button variant="black" className="mx-auto mt-14 w-[382px]">
            зареєструватись
          </Button>

          <div className="mt-[50px] pl-12">
            <span className="block text-white text-[20px]">Переваги</span>
            <div className="flex items-center gap-x-6 mt-[30px]">
              <SearchIcon className="text-white w-6 h-6" />
              <p className="text-white text-[20px]">
                Зручний спосіб відстеження свого замовлення
              </p>
            </div>
            <div className="flex items-center gap-x-6 mt-12">
              <Image
                src="/easy-access.svg"
                width={24}
                height={24}
                alt="easy-access"
              />
              <p className="text-white text-[20px]">
                Зручний спосіб відстеження свого замовлення
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AuthorizationPage;
