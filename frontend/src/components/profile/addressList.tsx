"use client";
import { useState } from "react";
import AddressBookItem from "./addressItem";

const addresBookData = [
  {
    firstName: "Зорина",
    lastName: "Марина",
    city: "Львів",
    address: "Стрийська 4/21/5",
    phone: "+380 (33) 219 00 33",
    isSelected: true,
  },
  {
    firstName: "Зорина",
    lastName: "Марина",
    city: "Київ",
    address: "Святошинська 8/95/10",
    phone: "+380 (33) 219 00 33",
    isSelected: false,
  },
];

const AddresBookList = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex flex-col gap-y-10">
      {addresBookData.map((item, index) => (
        <AddressBookItem
          selected={selected}
          setSelected={setSelected}
          index={index}
          {...item}
          key={index}
        />
      ))}
    </div>
  );
};

export default AddresBookList;
