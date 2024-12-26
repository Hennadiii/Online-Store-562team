import { motion } from 'framer-motion';
import Header from '../components/shared/header';
import { Link } from 'react-router-dom';

const NotFoundPage404 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto h-full max-w-[1440px] overflow-x-hidden px-80px"
    >
      <Header />
      <div className="bg-404 mt-5 flex h-[798px] w-full flex-col bg-no-repeat text-center text-white">
        <h1 className="mt-[200px] text-[140px] font-bold leading-[120%]">
          404
        </h1>
        <p className="text-h2">Ой, щось пішло не так</p>
        <Link to="/" className="text-h4 text-lightGrey underline">
          Повернутися на головну
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage404;
