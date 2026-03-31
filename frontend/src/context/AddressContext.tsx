"use client";

import {
  createContext, useContext, useState,
  useEffect, useCallback, ReactNode,
} from "react";
import { useAuthContext } from "@/context/AuthContext";
import { authService } from "@/services/authService"; // ← додати імпорт
import {
  fetchAddresses, createAddress, updateAddress as apiUpdate,
  deleteAddress as apiDelete, setDefaultAddress,
  AddressPayload,
} from "@/services/addressService";

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  region?: string;
  street: string;
  house: string;
  apartment?: string;
  floor?: string;
  hasElevator: boolean;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: Address[];
  loading: boolean;
  addAddress: (data: AddressPayload) => Promise<void>;
  updateAddress: (id: string, data: AddressPayload) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefault: (id: string) => Promise<void>;
  getDefault: () => Address | undefined;
  reload: () => Promise<void>;
}

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const token = authService.getAccessToken(); // ← читаємо токен напряму
    if (!isAuthenticated || !token) {
      setAddresses([]);
      return;
    }
    setLoading(true);
    try {
      setAddresses(await fetchAddresses(token));
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { load(); }, [load]);

  const addAddress = async (data: AddressPayload) => {
    const token = authService.getAccessToken();
    if (!token) return;
    await createAddress(token, data);
    await load();
  };

  const updateAddress = async (id: string, data: AddressPayload) => {
    const token = authService.getAccessToken();
    if (!token) return;
    await apiUpdate(token, id, data);
    await load();
  };

  const deleteAddress = async (id: string) => {
    const token = authService.getAccessToken();
    if (!token) return;
    await apiDelete(token, id);
    await load();
  };

  const setDefault = async (id: string) => {
    const token = authService.getAccessToken();
    if (!token) return;
    await setDefaultAddress(token, id);
    await load();
  };

  const getDefault = () => addresses.find((a) => a.isDefault);

  return (
    <AddressContext.Provider value={{
      addresses, loading,
      addAddress, updateAddress, deleteAddress,
      setDefault, getDefault, reload: load,
    }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddressContext must be used within AddressProvider");
  return ctx;
};