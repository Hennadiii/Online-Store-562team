"use client";
import { Imodal } from "@/@types/modal";
import { enableScroll } from "@/utils/scrollbar";
// import ForgotPassword from './forgotPassword';

const ModalWrapper: React.FC<Imodal> = ({
  setShowModal,
  showModal,
  children,
  center,
}) => {
  return (
    <section
      onClick={() => {
        setShowModal(false)
        enableScroll()
      }}
      className={`fixed inset-0 overflow-hidden transition-all ${
        center ? "z-50 flex items-center justify-center" : "z-30"
      } ${showModal ? "visible bg-black/70" : "invisible"} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-hidden shadow transition-all ${
          showModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } `}
      >
        {children}
      </div>
    </section>
  );
};

export default ModalWrapper;
