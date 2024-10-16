import CartIcon from '../../assets/cart-white.svg';

const ProductItem: React.FC = () => {
  return (
    <article>
      <div>
        <img
          className="cursor-pointer transition-transform hover:scale-[1.02]"
          src="product.png"
          alt="product"
        />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="flex flex-col gap-y-4">
          <h6 className="cursor-pointer text-[24px] font-bold">Potter ipsum</h6>
          <span className="text-[24px] font-extralight">
            Price <strong className="ml-2">$1 755</strong>
          </span>
        </div>
        <div className="group mb-2 cursor-pointer rounded-[13px] border-2 bg-main p-2 transition-all hover:scale-105 hover:bg-[#fff]">
          <CartIcon className="group text-[#fff] group-hover:text-[#000]" />
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
