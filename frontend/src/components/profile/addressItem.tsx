import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface props {
  setSelected: Dispatch<SetStateAction<number>>;
  selected: number;
  index: number;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  region?: string;
  address: string;
  isSelected: boolean;
}

const AddressBookItem: React.FC<props> = ({
  index,
  setSelected,
  selected,
  firstName,
  lastName,
  city,
  phone,
  region,
  address,
}) => {
  return (
    <div className="flex items-start justify-between w-[409px]">
      <div className="w-[228px]">
        <p>
          {firstName} {lastName}
        </p>
        <p className="mt-3 mb-4">
          м.{city}, обл.{region} вул.{address}
        </p>
        <p>Тел. {phone}</p>
        <div className="flex gap-x-2 mt-8 cursor-pointer">
          <Image src="/edit.svg" width={20} height={20} alt="edit" />
          <p>Редагувати</p>
        </div>
      </div>
      <input
        className="h-6 w-6"
        type="checkbox"
        onChange={() => setSelected(index)}
        checked={selected === index}
      />
    </div>
  );
};

export default AddressBookItem;
