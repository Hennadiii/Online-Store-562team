const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8081";

import { Address } from "@/context/AddressContext";

export interface AddressPayload {
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
}

const headers = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const fetchAddresses = async (token: string): Promise<Address[]> => {
  const res = await fetch(`${AUTH_API_URL}/api/addresses`, { headers: headers(token) });
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
};

export const createAddress = async (
  token: string,
  data: AddressPayload
): Promise<Address> => {
  const res = await fetch(`${AUTH_API_URL}/api/addresses`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create address");
  return res.json();
};

export const updateAddress = async (
  token: string,
  id: string,
  data: AddressPayload
): Promise<Address> => {
  const res = await fetch(`${AUTH_API_URL}/api/addresses/${id}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update address");
  return res.json();
};

export const deleteAddress = async (token: string, id: string): Promise<void> => {
  const res = await fetch(`${AUTH_API_URL}/api/addresses/${id}`, {
    method: "DELETE",
    headers: headers(token),
  });
  if (!res.ok) throw new Error("Failed to delete address");
};

export const setDefaultAddress = async (
  token: string,
  id: string
): Promise<Address> => {
  const res = await fetch(`${AUTH_API_URL}/api/addresses/${id}/default`, {
    method: "PATCH",
    headers: headers(token),
  });
  if (!res.ok) throw new Error("Failed to set default");
  return res.json();
};