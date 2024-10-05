import { useState } from 'react';
import Modal from './modal';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearch, setShowsSearch] = useState<boolean>(false);
  return (
    <header className="flex h-[120px] items-center justify-between px-20">
      <img src="logo.svg" alt="logo" />
      <div className="relative">
        <ul className="font-[e-ukraine Head] flex items-center gap-x-10 text-[28px]">
          {['Товари', 'Про нас', 'Акції', 'Контакти'].map((item, index) => (
            <li className="hover:text-second cursor-pointer" key={index}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
        <input
          className={`absolute ${showSearch ? 'w-full px-5' : 'w-0'} right-0 top-1 h-10 rounded-xl transition-all focus:outline-none`}
        />
      </div>
      <div className="flex items-center gap-x-8">
        <img
          onClick={() => setShowsSearch((prev) => !prev)}
          className="cursor-pointer transition-transform hover:scale-110"
          src="search.svg"
          alt="search"
        />
        <img
          className="cursor-pointer transition-transform hover:scale-110"
          src="cart.svg"
          alt="cart"
        />
        <img
          onClick={() => setShowModal(true)}
          className="cursor-pointer transition-transform hover:scale-110"
          src="profile.svg"
          alt="profile"
        />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;
