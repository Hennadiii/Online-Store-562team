import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/search.svg';
import UserIcon from '../../assets/user.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import CartIcon from '../../assets/cart.svg';
import ModalWrapper from './modalWrapper';
import LoginForm from '../forms/loginForm';
import RegisterForm from '../forms/registrationForm';
import CartModal from './cartModal';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearch, setShowsSearch] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [section, setSection] = useState<number>(1);

  const openModalHandler = (
    setOpenModal: Dispatch<SetStateAction<boolean>>
  ) => {
    window.document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    window.document.body.style.overflowY = 'hidden';
    setOpenModal(true);
  };

  const closeModalHandler = (
    setOpenModal: Dispatch<SetStateAction<boolean>>
  ) => {
    setOpenModal(false);
    const timer = setTimeout(() => {
      window.document.body.style.overflowY = 'auto';
      window.document.body.style.marginRight = '0px';
    }, 100);

    return () => clearTimeout(timer);
  };

  return (
    <header className="mt-8 flex h-fit items-center justify-between">
      <Link to="/">
        <img className="cursor-pointer" src="logo.svg" alt="logo" />
      </Link>

      <nav>
        <ul className="flex items-center gap-x-6">
          <li className="group cursor-pointer p-2 transition duration-300">
            <Link to="/catalog">Каталог</Link>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer p-2 transition duration-300">
            <Link to="/about-us">Про нас</Link>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer p-2 transition duration-300">
            <a>Доставка і оплата</a>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
          <li className="group cursor-pointer p-2 transition duration-300">
            <a>Контакти</a>
            <span className="block h-0.5 max-w-0 bg-accent transition-all duration-500 group-hover:max-w-full"></span>
          </li>
        </ul>
      </nav>

      <div className="relative flex items-center gap-x-6">
        <SearchIcon
          onClick={() => openModalHandler(setShowsSearch)}
          className="z-40 cursor-pointer transition-all hover:scale-110 hover:text-accent"
        />
        <UserIcon
          onClick={() => openModalHandler(setShowModal)}
          className="cursor-pointer transition-all hover:scale-110 hover:text-accent"
        />
        <FavoriteIcon className="cursor-pointer transition-all hover:scale-110 hover:text-accent" />
        <CartIcon
          onClick={() => openModalHandler(setShowCart)}
          className="cursor-pointer transition-all hover:scale-110 hover:text-accent"
        />
      </div>

      {/* sign-in & sign-up & forget-password pop up */}
      <ModalWrapper
        showModal={showModal}
        setShowModal={() => closeModalHandler(setShowModal)}
        center={true}
      >
        {
          [
            <LoginForm
              setSection={setSection}
              setShowModal={() => closeModalHandler(setShowModal)}
            />,
            <RegisterForm
              setSection={setSection}
              setShowModal={() => closeModalHandler(setShowModal)}
            />,
            // <ForgotPassword setSection={setSection} />,
          ][section - 1]
        }
      </ModalWrapper>

      {/* search popup */}
      <ModalWrapper
        showModal={showSearch}
        setShowModal={() => closeModalHandler(setShowsSearch)}
      >
        <div className="float-right mr-[254px] mt-[40px] flex w-[344px] justify-start bg-white p-5">
          <input
            placeholder="Введіть свій запит"
            className={`border-b-[1px] outline-white transition-all focus:outline-none ${showSearch ? 'w-[280px] px-4' : 'w-0'} `}
          />
        </div>
      </ModalWrapper>

      {/* cart popup */}
      <CartModal
        isOpen={showCart}
        setIsOpen={() => closeModalHandler(setShowCart)}
      />
    </header>
  );
};

export default Header;
