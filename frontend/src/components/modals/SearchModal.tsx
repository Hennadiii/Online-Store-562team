"use client";

import { cn } from "@/utils/twMerge";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchProducts } from "@/services/productService";
import type { ProductDto } from "@/types/product";

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
    .min(3, "Мінімум 3 символи"),
});

const SearchModal: React.FC<SearchModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [results, setResults] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(false);

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
      setResults([]);
    }
  }, [showModal]);

  // 🔍 LIVE SEARCH (debounce)
  useEffect(() => {
    if (queryValue.length < 3) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchProducts(queryValue);
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [queryValue]);

  const onSubmit = (data: SearchInputs) => {
    router.push(`/search?q=${data.query}`);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setResults([]);
    setShowModal();
  };

  const { ref, ...rest } = register("query");

  return (
    <div className="
      relative w-full bg-white  rounded-2xl
      px-4 pt-12 pb-6
      sm:max-w-lg sm:px-8 sm:pb-8
      md:max-w-xl
      lg:max-w-2xl
    ">
      {/* CLOSE */}
      <button
        type="button"
        onClick={handleClose}
        className="
          absolute top-4 right-4
          rounded-full p-2
          text-gray-400 hover:text-black hover:bg-gray-100
        "
      >
        ✕
      </button>

      <p className="mb-4 text-xs uppercase tracking-widest text-gray-400">
        Пошук
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={cn(
          "flex items-center gap-2 border-b-2 pb-2",
          errors.query
            ? "border-red-400"
            : "border-gray-200 focus-within:border-black"
        )}>
          <input
            {...rest}
            ref={(e) => {
              ref(e);
              // @ts-ignore
              inputRef.current = e;
            }}
            type="text"
            placeholder="Введіть свій запит..."
            className="flex-1 bg-transparent outline-none text-lg"
          />
        </div>

        {/* ERROR */}
        {errors.query && (
          <p className="text-xs text-red-500 mt-2">
            {errors.query.message}
          </p>
        )}

        {/* RESULTS */}
        {loading && (
          <p className="text-sm text-gray-400 mt-3">Пошук...</p>
        )}

        {!loading && results.length > 0 && (
          <div className="mt-4 max-h-80 overflow-y-auto border rounded-xl divide-y">
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  router.push(`/product/${product.id}`);
                  handleClose();
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-14 h-14 relative rounded-md overflow-hidden bg-gray-100">
                {product.images?.[0] ? (
  <Image
    src={product.images[0]}
    alt={product.title}
    fill
    className="object-cover"
  />
) : (
                    <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">
                      no img
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {product.price} ₴
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && queryValue.length >= 3 && results.length === 0 && (
          <p className="text-sm text-gray-400 mt-3">
            Нічого не знайдено
          </p>
        )}

        {/*<button
          type="submit"
          className="
            mt-6 w-full bg-black text-white py-3
            text-sm uppercase hover:bg-gray-800
          "
        >
          Знайти
        </button>*/}
      </form>
    </div>
  );
};

export default SearchModal;