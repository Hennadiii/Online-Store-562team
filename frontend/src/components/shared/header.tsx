import { useState } from 'react';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/search.svg';
import UserIcon from '../../assets/user.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import CartIcon from '../../assets/cart.svg';

const navigation: { [key: string]: string } = {
  Товари: '/products',
};

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearch, setShowsSearch] = useState<boolean>(false);

  const navigate = useNavigate();
  return (
    <header className="mt-8 flex h-fit items-center justify-between">
      <img src="logo.svg" />

      <nav>
        <ul className="flex items-center gap-x-6">
          <li className="group cursor-pointer p-2 transition duration-300">
            <a>Каталог</a>
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

      <div className="flex items-center gap-x-6">
        <SearchIcon className="hover:text-accent cursor-pointer transition-all hover:scale-110" />
        <UserIcon className="hover:text-accent cursor-pointer transition-all hover:scale-110" />
        <FavoriteIcon className="hover:text-accent cursor-pointer transition-all hover:scale-110" />
        <CartIcon className="hover:text-accent cursor-pointer transition-all hover:scale-110" />
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;
