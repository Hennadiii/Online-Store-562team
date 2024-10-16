import { IcategoryItem } from '../../@types/categoryItem';

const CategoryItem: React.FC<IcategoryItem> = ({ children, img }) => {
  return (
    <div className="flex w-[188px] cursor-pointer flex-col gap-y-3 text-center transition-transform hover:scale-[1.015]">
      <img src={img} />
      <a className="text-[24px] font-bold">{children}</a>
    </div>
  );
};

export default CategoryItem;
