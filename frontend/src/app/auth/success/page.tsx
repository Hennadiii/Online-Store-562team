"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuthContext();
  const called = useRef(false); // защита от двойного вызова

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken) {
      router.replace("/");
      return;
    }

    login({ accessToken, refreshToken: refreshToken ?? "" });
    router.replace("/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Авторизація через Google...</p>
    </div>
  );
}