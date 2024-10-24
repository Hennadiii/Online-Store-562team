import { useState } from 'react';
import Modal from './modal';
import LogoIcon from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const navigation: { [key: string]: string } = {
  Товари: '/products',
};

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearch, setShowsSearch] = useState<boolean>(false);

  const navigate = useNavigate();
  return (
    <header className="flex h-[120px] items-center justify-between px-[75px]">
      <LogoIcon
        onClick={() => navigate('/')}
        className="cursor-pointer text-axcent"
      />
      <div className="relative">
        <ul className="flex items-center gap-x-20 text-[20px]">
          {['Товари', 'Про нас', 'Акції', 'Контакти'].map((item, index) => (
            <li className="cursor-pointer hover:text-second" key={index}>
              <a onClick={() => navigate(navigation[item])}>{item}</a>
            </li>
          ))}
        </ul>
        <input
          className={`absolute ${showSearch ? 'w-[101%] px-5' : 'w-0'} right-0 top-1 h-10 rounded-xl transition-all focus:outline-none`}
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
