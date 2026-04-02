"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import Modal from "@/components/modals/modal";
import { useAddressContext, Address } from "@/context/AddressContext";
import { useAuthContext } from "@/context/AuthContext";
import AddressForm, { AddressFormData, EMPTY_ADDRESS, isAddressValid } from "@/components/address/AddressForm";

interface AddressCardProps {
  address: Address;
  onSetDefault: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressCard = ({ address, onSetDefault, onEdit, onDelete }: AddressCardProps) => {
  const { firstName, lastName, phone, city, region, street, house, apartment, floor, hasElevator, isDefault } = address;

  return (
    <div className={`relative rounded-2xl border p-5 transition-all duration-200 ${
      isDefault ? "border-black bg-gray-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
    }`}>

      {/* ✅ Плашка "Основна" — тільки для default адреси */}
      {isDefault && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest text-white bg-black rounded-full px-2.5 py-1">
          Основна
        </span>
      )}

      <div className="flex flex-col gap-1 pr-24 mb-4">
        <p className="font-semibold text-sm">{firstName} {lastName}</p>
        <p className="text-sm text-gray-500">{phone}</p>
        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
          м. {city}{region ? `, ${region} обл.` : ""}, вул. {street} {house}
          {apartment ? `, кв. ${apartment}` : ""}
          {floor ? `, поверх ${floor}` : ""}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">
  Ліфт:{" "}
  <span
    className={
      hasElevator
        ? "text-black font-semibold text-sm"
        : "text-gray-700 font-semibold text-sm"
    }
  >
    {hasElevator ? "є" : "немає"}
  </span>
</p>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">

        {/* ✅ Кнопка "Зробити основною" — тільки для НЕ default адрес */}
        {!isDefault && (
          <button
            onClick={onSetDefault}
            className="text-xs text-gray-600 hover:text-black transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Зробити основною
          </button>
        )}

        <button
          onClick={onEdit}
          className="text-xs text-gray-600 hover:text-black transition-colors flex items-center gap-1.5 ml-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Редагувати
        </button>

        <button
          onClick={onDelete}
          className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Видалити
        </button>
      </div>
    </div>
  );
};

const AddressBookPage = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddressContext();
  const { user } = useAuthContext(); // ← для автопідстановки

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<AddressFormData>(EMPTY_ADDRESS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState<AddressFormData>(EMPTY_ADDRESS);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // ✅ Автопідстановка з профілю при відкритті форми
  const handleOpenAddForm = () => {
    if (!showAddForm) {
      const nameParts = user?.name?.split(" ") || [];
      setNewAddress({
        ...EMPTY_ADDRESS,
        firstName: nameParts[0] || "",
        lastName:  nameParts.slice(1).join(" ") || "",
        phone:     user?.phone || "",
      });
    } else {
      setNewAddress(EMPTY_ADDRESS);
    }
    setShowAddForm((v) => !v);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditDraft({
      firstName:   addr.firstName,
      lastName:    addr.lastName,
      phone:       addr.phone,
      city:        addr.city,
      region:      addr.region ?? "",
      street:      addr.street,
      house:       addr.house,
      apartment:   addr.apartment ?? "",
      floor:       addr.floor ?? "",
      hasElevator: addr.hasElevator,
    });
    setEditingId(addr.id);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    await updateAddress(editingId, {
      ...editDraft,
      hasElevator: editDraft.hasElevator ?? false,
    });
    setEditingId(null);
  };

  const handleAddNew = async () => {
    await addAddress({
      ...newAddress,
      hasElevator: newAddress.hasElevator ?? false,
    });
    setNewAddress(EMPTY_ADDRESS);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteAddress(id);
    setDeleteConfirmId(null);
  };

  const editingAddress = editingId ? addresses.find((a) => a.id === editingId) : null;

  return (
    <AnimatedSection>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto pb-20">
        <ProfileSidebar />

        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Адреси доставки</h2>
            <button
              onClick={handleOpenAddForm} // ← замінено
              className={`flex items-center gap-2 px-4 h-[40px] text-sm font-medium transition-all duration-200 border ${
                showAddForm
                  ? "border-gray-300 text-gray-600 hover:bg-gray-100"
                  : "border-black bg-black text-white hover:bg-gray-800"
              }`}
            >
              {showAddForm ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Скасувати
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Нова адреса
                </>
              )}
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6 p-5 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-semibold mb-4">Нова адреса доставки</h3>
              <AddressForm
                data={newAddress}
                onChange={(field, value) => setNewAddress((prev) => ({ ...prev, [field]: value }))}
                onSubmit={handleAddNew}
                onCancel={() => { setShowAddForm(false); setNewAddress(EMPTY_ADDRESS); }}
                submitLabel="Додати адресу"
                isValid={isAddressValid(newAddress)}
              />
            </div>
          )}

          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
              <svg className="w-12 h-12 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">Адрес ще немає</p>
              <button
                onClick={handleOpenAddForm} // ← замінено
                className="mt-3 text-sm underline hover:text-black transition-colors"
              >
                Додати першу адресу
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  onSetDefault={() => setDefault(addr.id)}
                  onEdit={() => handleOpenEdit(addr)}
                  onDelete={() => setDeleteConfirmId(addr.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {editingAddress && editingId && (
        <Modal onClose={() => setEditingId(null)}>
          <h3 className="text-lg font-semibold mb-5">Редагувати адресу</h3>
          <AddressForm
            data={editDraft}
            onChange={(field, value) => setEditDraft((prev) => ({ ...prev, [field]: value }))}
            onSubmit={handleSaveEdit}
            onCancel={() => setEditingId(null)}
            submitLabel="Зберегти зміни"
            isValid={isAddressValid(editDraft)}
          />
        </Modal>
      )}

      {deleteConfirmId && (
        <Modal onClose={() => setDeleteConfirmId(null)}>
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-2">Видалити адресу?</h3>
            <p className="text-sm text-gray-500 mb-6">Цю дію неможливо скасувати.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="w-full sm:w-auto px-8 h-[44px] rounded-xl bg-red text-white hover:bg-red transition-colors text-sm font-medium"
              >
                Видалити
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-full sm:w-auto px-6 h-[44px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
              >
                Скасувати
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AnimatedSection>
  );
};

export default AddressBookPage;