import { useState } from 'react';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/search.svg';
import UserIcon from '../../assets/user.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import CartIcon from '../../assets/cart.svg';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearch, setShowsSearch] = useState<boolean>(false);

  const navigate = useNavigate();
  return (
    <header className="mt-8 flex h-fit items-center justify-between">
      <img
        className="cursor-pointer"
        onClick={() => navigate('/')}
        src="logo.svg"
        alt="logo"
      />

      <nav>
        <ul className="flex items-center gap-x-6">
          <li className="group cursor-pointer p-2 transition duration-300">
            <a onClick={() => navigate('/catalog')}>Каталог</a>
            <span className="bg-accent block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer p-2 transition duration-300">
            <a>Про нас</a>
            <span className="bg-accent block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer p-2 transition duration-300">
            <a>Доставка і оплата</a>
            <span className="bg-accent block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer p-2 transition duration-300">
            <a>Контакти</a>
            <span className="bg-accent block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
          </li>
        </ul>
      </nav>

      <div className="relative flex items-center gap-x-6">
        <SearchIcon
          onClick={() => setShowsSearch(true)}
          className="hover:text-accent z-50 cursor-pointer transition-all hover:scale-110"
        />
        <UserIcon
          onClick={() => setShowModal(true)}
          className="hover:text-accent cursor-pointer transition-all hover:scale-110"
        />
        <FavoriteIcon className="hover:text-accent cursor-pointer transition-all hover:scale-110" />
        <CartIcon className="hover:text-accent cursor-pointer transition-all hover:scale-110" />
        <div
          onClick={() => setShowsSearch(false)}
          className={`fixed inset-0 z-30 transition-colors ${showSearch ? 'bg-black/70 visible' : 'invisible'} `}
        >
          <div
            className="float-right mr-[254px] mt-[40px] flex w-[344px] justify-start bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              placeholder="Введіть свій запит"
              className={`border-b-[1px] outline-white transition-all focus:outline-none ${showSearch ? 'w-[280px] px-4' : 'w-0'} `}
            />
          </div>
        </div>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;
