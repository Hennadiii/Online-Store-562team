interface props {
  image: string;
  name: string;
  variant?: true;
  price?: string;
  heightDiv?: string;
  heightImage?: string;
}

const ProductItem: React.FC<props> = ({
  image,
  name,
  price,
  variant,
  heightImage = 'h-[357px]',
}) => {
  return (
    <article className={`group ${variant ? `w-[49%]` : 'w-[282px]'}`}>
      <div
        className={`flex ${variant ? `${heightImage} w-40%` : 'h-[316px] w-[282px]'} cursor-pointer items-center justify-center bg-[#f1f1f1]`}
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
