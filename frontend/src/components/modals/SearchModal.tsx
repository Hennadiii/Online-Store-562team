"use client";

import { cn } from "@/utils/twMerge";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface SearchModalProps {
  showModal: boolean;
  setShowModal: () => void;
}

interface SearchInputs {
  query: string;
}

const searchSchema = yup.object().shape({
  query: yup
    .string()
    .required("Введіть запит для пошуку")
    .min(2, "Мінімум 2 символи"),
});

const SearchModal: React.FC<SearchModalProps> = ({ showModal, setShowModal }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SearchInputs>({
    resolver: yupResolver(searchSchema),
    mode: "onChange",
  });

  const queryValue = watch("query", "");

  useEffect(() => {
    if (showModal) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      reset();
    }
  }, [showModal]);

  const onSubmit = (data: SearchInputs) => {
    console.log("Search:", data.query);
  };

  const handleClose = () => {
    reset();
    setShowModal();
  };

  const { ref, ...rest } = register("query");

  return (
    <div className="
      relative w-full bg-white shadow-2xl rounded-2xl
      px-4 pt-12 pb-6
      sm:max-w-lg sm:px-8 sm:pb-8
      md:max-w-xl
      lg:max-w-2xl
    ">
      {/* Кнопка закрытия */}
      <button
        type="button"
        onClick={handleClose}
        className="
          absolute top-4 right-4
          rounded-full p-2
          text-gray-400 hover:text-black hover:bg-gray-100
          transition-colors duration-200
        "
        aria-label="Закрити"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {/* Заголовок */}
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Пошук
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Строка поиска */}
        <div className={cn(
          "flex items-center gap-2 border-b-2 pb-2 transition-colors duration-300",
          errors.query
            ? "border-red-400"
            : "border-gray-200 focus-within:border-black"
        )}>
          <svg
            className="shrink-0 text-gray-400 w-5 h-5"
            fill="none" stroke="currentColor" strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>

          <input
            {...rest}
            ref={(e) => {
              ref(e);
              // @ts-ignore
              inputRef.current = e;
            }}
            type="text"
            placeholder="Введіть свій запит..."
            className="
              flex-1 min-w-0 bg-transparent outline-none
              text-base sm:text-lg
              placeholder-gray-300
              py-1
            "
          />

          {/* Кнопка очистки */}
          {queryValue?.length > 0 && (
            <button
              type="button"
              onClick={() => reset()}
              aria-label="Очистити"
              className="
                shrink-0 rounded-full p-1
                text-gray-400 hover:text-black hover:bg-gray-100
                transition-colors
              "
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Ошибка валидации */}
        <div className="min-h-[20px] mt-2">
          {errors.query && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-8-3a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" clipRule="evenodd" />
              </svg>
              {errors.query.message}
            </p>
          )}
        </div>

        {/* Кнопка поиска */}
        <button
          type="submit"
          className="
            mt-4 w-full
            bg-black text-white
            py-3 rounded-xl
            text-sm font-semibold tracking-wide uppercase
            hover:bg-gray-800 active:scale-[0.98]
            transition-all duration-200
            sm:mt-6
          "
        >
          Знайти
        </button>
      </form>
    </div>
  );
};

export default SearchModal;