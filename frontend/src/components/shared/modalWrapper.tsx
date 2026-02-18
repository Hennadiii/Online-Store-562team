"use client";

import { Imodal } from "@/@types/modal";
import { enableScroll } from "@/utils/scrollbar";

const ModalWrapper: React.FC<Imodal> = ({
  setShowModal,
  showModal,
  children,
  center,
}) => {
  return (
    <section
      onClick={() => {
        setShowModal(false);
        enableScroll();
      }}
      className={`fixed inset-0 overflow-auto transition-all ${
        center ? "z-50 flex items-center justify-center" : "z-30"
      } ${showModal ? "visible bg-black/70" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-md p-4 sm:p-6 md:p-8 shadow-lg transition-transform duration-300 transform ${
          showModal ? "scale-100 opacity-100" : "scale-105 opacity-0"
        } w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`}
      >
        {children}
      </div>
    </section>
  );
};

export default ModalWrapper;
