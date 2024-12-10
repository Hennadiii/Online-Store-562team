interface props {
  image: string;
  name: string;
  variant?: true;
  price?: string;
  heightDiv?: string;
  heightImage?: string;
  widthImage?: string;
  widthDiv?: string;
}

const ProductItem: React.FC<props> = ({
  image,
  name,
  price,
  variant,
  heightDiv = 'h-[316px]',
  widthDiv = 'w-[282px]',
  widthImage = 'w-[282px]',
  heightImage = 'h-[357px]',
}) => {
  return (
    <article className={`group ${variant ? `w-[49%]` : `${widthDiv}`}`}>
      <div
        className={`flex ${variant ? `${heightImage} w-40%` : `${heightDiv} ${widthImage}`} cursor-pointer items-center justify-center bg-[#f1f1f1]`}
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
