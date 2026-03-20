"use client";

import { Iauthorization } from "@/@types/modal";
import { Button } from "../ui/button";
import Image from "next/image";

const RestorePasswordForm: React.FC<Iauthorization> = ({
  setSection,
  setShowModal,
}) => {
  return (
    <div
      className="relative w-full max-w-[470px] bg-white 
                 px-6 sm:px-[44px] 
                 pt-14 sm:pt-16 
                 pb-10 sm:pb-[52px] 
                 flex flex-col gap-y-6"
    >
      <div
        onClick={() => setShowModal?.(false)}
        className="absolute right-4 top-4 cursor-pointer rounded-full p-2 transition hover:bg-grey"
      >
        <Image width={24} height={24} src="/close.svg" className="h-6 w-6" alt="close" />
      </div>

      <span className="text-center text-lg font-bold">Відновлення пароля</span>

      <div className="flex flex-col items-center gap-3 py-2">
        <p className="text-center text-sm text-gray-500 leading-relaxed">
          Відновлення пароля тимчасово недоступне.
        </p>
        <p className="text-center text-sm text-gray-500 leading-relaxed">
          Зверніться до підтримки за адресою:
        </p>
        <span className="text-sm font-medium text-gray-700">
          support@cozycorners.com
        </span>
      </div>

      <Button variant="black" className="w-full" onClick={() => setSection?.(1)}>
        Повернутися до входу
      </Button>

      
    </div>
  );
};

export default RestorePasswordForm;