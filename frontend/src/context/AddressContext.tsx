"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Address {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  region: string;
  street: string;
  house: string;
  apartment?: string;
  floor?: string;
  hasElevator?: boolean;
  isDefault: boolean;
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    firstName: "Марина",
    lastName: "Зоряна",
    phone: "+380332190033",
    city: "Львів",
    region: "Львівська",
    street: "Стрийська",
    house: "4/21",
    apartment: "5",
    floor: "2",
    hasElevator: true,
    isDefault: true,
  },
  {
    id: 2,
    firstName: "Марина",
    lastName: "Зоряна",
    phone: "+380332190033",
    city: "Київ",
    region: "Київська",
    street: "Святошинська",
    house: "8/95",
    apartment: "10",
    floor: "",
    hasElevator: false,
    isDefault: false,
  },
];

interface AddressContextType {
  addresses: Address[];
  addAddress: (a: Omit<Address, "id" | "isDefault">) => void;
  updateAddress: (id: number, a: Omit<Address, "id" | "isDefault">) => void;
  deleteAddress: (id: number) => void;
  setDefault: (id: number) => void;
  getDefault: () => Address | undefined;
}

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);

  const addAddress = (data: Omit<Address, "id" | "isDefault">) =>
    setAddresses((prev) => [...prev, { ...data, id: Date.now(), isDefault: false }]);

  const updateAddress = (id: number, data: Omit<Address, "id" | "isDefault">) =>
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));

  const deleteAddress = (id: number) =>
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      const wasDefault = prev.find((a) => a.id === id)?.isDefault;
      if (wasDefault && filtered.length > 0) filtered[0].isDefault = true;
      return filtered;
    });

  const setDefault = (id: number) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const getDefault = () => addresses.find((a) => a.isDefault);

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, setDefault, getDefault }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddressContext must be used within AddressProvider");
  return ctx;
};