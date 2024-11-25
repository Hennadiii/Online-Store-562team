import { useState } from 'react';
import { Imodal } from '../../@types/modal';
import LoginForm from '../forms/loginForm';
import RegisterForm from '../forms/registrationForm';
import { AnimatePresence } from 'framer-motion';
// import ForgotPassword from './forgotPassword';

const Modal: React.FC<Imodal> = ({ setShowModal, showModal }) => {
  const [section, setSection] = useState<number>(1);
  return (
    <section
      onClick={() => setShowModal(false)}
      className={`fixed inset-0 z-30 flex items-center justify-center transition-colors ${showModal ? 'bg-black/70 visible' : 'invisible'} `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-y-auto bg-[#fff] shadow transition-all ${showModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} `}
      >
        <AnimatePresence>
          {
            [
              <LoginForm setSection={setSection} />,
              <RegisterForm setSection={setSection} />,
              // <ForgotPassword setSection={setSection} />,
            ][section - 1]
          }
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Modal;
