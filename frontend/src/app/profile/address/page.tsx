"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import Modal from "@/components/modals/modal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Address {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  region: string;
  street: string;
  house: string;
  apartment: string;
  floor: string;
  npBranch: string;
  isSelected: boolean;
}

const EMPTY_ADDRESS: Omit<Address, "id" | "isSelected"> = {
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  region: "",
  street: "",
  house: "",
  apartment: "",
  floor: "",
  npBranch: "",
};

const FIELDS: { field: keyof typeof EMPTY_ADDRESS; label: string; placeholder: string; required?: boolean }[] = [
  { field: "firstName",  label: "Імʼя",               placeholder: "Введіть імʼя",       required: true },
  { field: "lastName",   label: "Прізвище",            placeholder: "Введіть прізвище",   required: true },
  { field: "phone",      label: "Телефон",             placeholder: "+380XXXXXXXXX",      required: true },
  { field: "city",       label: "Місто",               placeholder: "Наприклад, Київ",    required: true },
  { field: "region",     label: "Область",             placeholder: "Наприклад, Київська",required: true },
  { field: "street",     label: "Вулиця",              placeholder: "Назва вулиці",       required: true },
  { field: "house",      label: "Будинок",             placeholder: "№ будинку",          required: true },
  { field: "apartment",  label: "Квартира",            placeholder: "№ квартири" },
  { field: "floor",      label: "Поверх",              placeholder: "Поверх" },
  { field: "npBranch",   label: "Відділення Нової пошти", placeholder: "Наприклад, відділення №12" },
];

// ─── Initial Data ──────────────────────────────────────────────────────────────

const initialAddresses: Address[] = [
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
    npBranch: "відділення №12",
    isSelected: true,
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
    npBranch: "відділення №5",
    isSelected: false,
  },
];

// ─── Address Form ──────────────────────────────────────────────────────────────

interface AddressFormProps {
  data: Omit<Address, "id" | "isSelected">;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel: string;
  isValid: boolean;
}

const AddressForm = ({ data, onChange, onSubmit, onCancel, submitLabel, isValid }: AddressFormProps) => {
  const inputBase =
    "w-full h-[44px] px-3 border rounded-lg bg-white transition-colors duration-200 focus:outline-none text-sm border-gray-300 hover:border-gray-400 focus:border-black";

  // Helper to render a single field
  const Field = ({ field, label, placeholder, type }: { field: keyof typeof EMPTY_ADDRESS; label: string; placeholder: string; type?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-600 font-medium">{label}</label>
      <input
        value={data[field]}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        type={type}
        className={inputBase}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Ряд 1: Імʼя + Прізвище */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field field="firstName" label="Імʼя"      placeholder="Введіть імʼя" />
        <Field field="lastName"  label="Прізвище"  placeholder="Введіть прізвище" />
      </div>

      {/* Ряд 2: Телефон + Місто + Область */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field field="phone"  label="Телефон" placeholder="+380XXXXXXXXX" type="tel" />
        <Field field="city"   label="Місто"   placeholder="Наприклад, Київ" />
        <Field field="region" label="Область" placeholder="Київська" />
      </div>

      {/* Ряд 3: Вулиця (широка) + Поверх (вузький) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Field field="street" label="Вулиця" placeholder="Назва вулиці" />
        </div>
        <Field field="floor" label="Поверх" placeholder="№" />
      </div>

      {/* Ряд 4: Будинок + Квартира + Відділення НП */}
      <div className="grid grid-cols-3 gap-3">
        <Field field="house"     label="Будинок"  placeholder="№ будинку" />
        <Field field="apartment" label="Квартира" placeholder="№ кв." />
        <Field field="npBranch"  label="Відд. Нової пошти" placeholder="відд. №" />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 h-[44px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          >
            Скасувати
          </button>
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full sm:w-auto px-8 h-[44px] rounded-xl text-sm font-medium transition-all duration-200 ${
            isValid
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
};

// ─── Address Card ──────────────────────────────────────────────────────────────

interface AddressCardProps {
  address: Address;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressCard = ({ address, onSelect, onEdit, onDelete }: AddressCardProps) => {
  const { firstName, lastName, phone, city, region, street, house, apartment, floor, npBranch, isSelected } = address;

  return (
    <div
      className={`relative rounded-2xl border p-5 transition-all duration-200 ${
        isSelected
          ? "border-black bg-gray-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      {/* Primary badge */}
      {isSelected && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest text-white bg-black rounded-full px-2.5 py-1">
          Основний
        </span>
      )}

      {/* Info */}
      <div className="flex flex-col gap-1 pr-24 mb-4">
        <p className="font-semibold text-sm">
          {firstName} {lastName}
        </p>
        <p className="text-sm text-gray-500">{phone}</p>
        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
          м. {city}, {region} обл., вул. {street} {house}
          {apartment ? `, кв. ${apartment}` : ""}
          {floor ? `, поверх ${floor}` : ""}
        </p>
        {npBranch && (
          <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Нова пошта: {npBranch}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        {!isSelected && (
          <button
            onClick={onSelect}
            className="text-xs text-gray-600 hover:text-black transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Зробити основним
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

// ─── Page ──────────────────────────────────────────────────────────────────────

const isFormValid = (data: Omit<Address, "id" | "isSelected">) =>
  Boolean(
    data.firstName.trim() &&
    data.lastName.trim() &&
    data.phone.trim() &&
    data.city.trim() &&
    data.region.trim() &&
    data.street.trim() &&
    data.house.trim()
  );

const AddressBookPage = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Address, "id" | "isSelected">>(EMPTY_ADDRESS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, "id" | "isSelected">>(EMPTY_ADDRESS);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Select as primary
  const handleSelect = (id: number) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isSelected: a.id === id })));

  // Open edit modal
  const handleOpenEdit = (addr: Address) => {
    const { id, isSelected, ...rest } = addr;
    setEditDraft(rest);
    setEditingId(id);
  };

  // Save edit
  const handleSaveEdit = () => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === editingId ? { ...a, ...editDraft } : a))
    );
    setEditingId(null);
  };

  // Add new
  const handleAddNew = () => {
    setAddresses((prev) => [
      ...prev,
      { ...newAddress, id: Date.now(), isSelected: false },
    ]);
    setNewAddress(EMPTY_ADDRESS);
    setShowAddForm(false);
  };

  // Delete
  const handleDelete = (id: number) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      // if deleted was selected — select first
      const wasSelected = prev.find((a) => a.id === id)?.isSelected;
      if (wasSelected && filtered.length > 0) {
        filtered[0].isSelected = true;
      }
      return filtered;
    });
    setDeleteConfirmId(null);
  };

  const editingAddress = editingId !== null ? addresses.find((a) => a.id === editingId) : null;

  return (
    <AnimatedSection>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto pb-20">
        <ProfileSidebar />

        <section className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Адреси доставки</h2>
            <button
              onClick={() => setShowAddForm((v) => !v)}
              className={`flex items-center gap-2 px-4 h-[40px]  text-sm font-medium transition-all duration-200 border  ${
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

          {/* Add form (inline, collapsible) */}
          {showAddForm && (
            <div className="mb-6 p-5 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-semibold mb-4">Нова адреса доставки</h3>
              <AddressForm
                data={newAddress}
                onChange={(field, value) =>
                  setNewAddress((prev) => ({ ...prev, [field]: value }))
                }
                onSubmit={handleAddNew}
                onCancel={() => { setShowAddForm(false); setNewAddress(EMPTY_ADDRESS); }}
                submitLabel="Додати адресу"
                isValid={isFormValid(newAddress)}
              />
            </div>
          )}

          {/* Address list */}
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
              <svg className="w-12 h-12 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">Адрес ще немає</p>
              <button onClick={() => setShowAddForm(true)} className="mt-3 text-sm underline hover:text-black transition-colors">
                Додати першу адресу
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  onSelect={() => handleSelect(addr.id)}
                  onEdit={() => handleOpenEdit(addr)}
                  onDelete={() => setDeleteConfirmId(addr.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Edit Modal */}
      {editingAddress && editingId !== null && (
        <Modal onClose={() => setEditingId(null)}>
          <h3 className="text-lg font-semibold mb-5">Редагувати адресу</h3>
          <AddressForm
            data={editDraft}
            onChange={(field, value) =>
              setEditDraft((prev) => ({ ...prev, [field]: value }))
            }
            onSubmit={handleSaveEdit}
            onCancel={() => setEditingId(null)}
            submitLabel="Зберегти зміни"
            isValid={isFormValid(editDraft)}
          />
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId !== null && (
        <Modal onClose={() => setDeleteConfirmId(null)}>
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-2">Видалити адресу?</h3>
            <p className="text-sm text-gray-500 mb-6">Цю дію неможливо скасувати.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="w-full sm:w-auto px-8 h-[44px] rounded-xl bg-red text-white hover:bg-red-600 transition-colors text-sm font-medium"
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