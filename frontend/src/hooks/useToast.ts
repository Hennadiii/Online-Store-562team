"use client";

import { useState, useCallback, useRef } from "react";

export interface ToastState {
  message: string;
  visible: boolean;
}

export const useToast = (duration = 3000) => {
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ message, visible: true });

    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
  }, [duration]);

  return { toast, showToast };
};