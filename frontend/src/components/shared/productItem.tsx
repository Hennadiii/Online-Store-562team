interface props {
  image: string;
  name: string;
  variant?: true;
  price?: string;
}

const ProductItem: React.FC<props> = ({ image, name, price, variant }) => {
  return (
    <article
      className={`group ${variant ? 'h-[389px] w-[49%]' : 'h-[350px] w-[282px]'}`}
    >
      <div
        className={`flex ${variant ? 'w-40% h-[357px]' : 'h-[316px] w-[282px]'} cursor-pointer items-center justify-center bg-[#f1f1f1]`}
      >
        <img
          src={image}
          alt="product"
          className="w-full transition-transform group-hover:scale-110"
        />
      </div>
      <div className="flex items-center justify-between gap-x-2">
        <span className="mt-[6px] block text-[20px]">{name}</span>
        <data value={price}>
          {price} {price ? '₴' : null}
        </data>
      </div>
    </article>
  );
};

export default ProductItem;
