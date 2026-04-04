import React from "react";
import type { ToastState } from "@/hooks/useToast";

interface ToastProps {
  toast: ToastState;
  fixed?: boolean; // true = fixed по экрану, false = inline под формой
  position?: "top" | "bottom"; // можно выбрать верх/низ
}

const Toast: React.FC<ToastProps> = ({ toast, fixed = true, position = "bottom" }) => (
  <div
    role="status"
    aria-live="polite"
    className={`
      ${fixed
        ? `fixed inset-x-0 ${position}-0 flex justify-center`
        : "w-full text-center mt-2"
      }
      pointer-events-none z-50
    `}
  >
    <div
      className={`
        max-w-2xl w-full mx-4 px-6 py-3
        bg-[#3C767E] text-white text-sm sm:text-base text-center
        rounded-lg shadow-lg
        transition-all duration-300 ease-in-out
        ${toast.visible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {toast.message}
    </div>
  </div>
);

export default Toast;