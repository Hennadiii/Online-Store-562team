import { useState } from 'react';
import { Imodal } from '../../@types/modal';
import LoginForm from './loginForm';

const Modal: React.FC<Imodal> = ({ setShowModal, showModal }) => {
  const [section, setSection] = useState<number>(0);
  return (
    <section
      onClick={() => setShowModal(false)}
      className={`p-30 fixed inset-0 z-30 flex items-center justify-center transition-colors ${showModal ? 'visible bg-[#3C767E]/70' : 'invisible'} `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-y-auto rounded-[10px] bg-[#fff] p-10 shadow transition-all ${showModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} `}
      >
        <LoginForm />
      </div>
    </section>
  );
};

export default Modal;
