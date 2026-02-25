"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/profile/sidebar";
import { Button } from "@/components/ui/button";

const initialProfileData = {
  lastName: "Зоряна",
  firstName: "Марина",
  phone: "+380331234567",
  email: "marinzor@gmail.com",
};

const initialPasswordData = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+380\d{9}$/;

const FIELD_LABELS: Record<string, string> = {
  lastName: "Прізвище",
  firstName: "Імʼя",
  phone: "Телефон",
  email: "Email",
  oldPassword: "Старий пароль",
  newPassword: "Новий пароль",
  confirmPassword: "Підтвердіть новий пароль",
};

const SettingsPage = () => {
  const [profile, setProfile] = useState(initialProfileData);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileSaved, setProfileSaved] = useState(false);

  const [password, setPassword] = useState(initialPasswordData);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordSaved, setPasswordSaved] = useState(false);

  const profileChanged =
    JSON.stringify(profile) !== JSON.stringify(initialProfileData);
  const passwordChanged =
    JSON.stringify(password) !== JSON.stringify(initialPasswordData);

  const validateField = (
    name: string,
    value: string,
    block: "profile" | "password",
    currentPassword?: typeof password
  ) => {
    let error = "";

    if (block === "profile") {
      switch (name) {
        case "lastName":
        case "firstName":
          if (value.trim().length < 2) error = "Мінімум 2 символи";
          break;
        case "phone":
          if (!phoneRegex.test(value)) error = "Формат: +380XXXXXXXXX";
          break;
        case "email":
          if (!emailRegex.test(value)) error = "Некоректний email";
          break;
      }
      setProfileErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (block === "password") {
      const pw = currentPassword ?? password;
      switch (name) {
        case "newPassword":
          if (value && value.length < 6) error = "Мінімум 6 символів";
          break;
        case "confirmPassword":
          if (value !== pw.newPassword) error = "Паролі не співпадають";
          break;
      }
      setPasswordErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    validateField(name, value, "profile");
    setProfileSaved(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...password, [name]: value };
    setPassword(next);
    validateField(name, value, "password", next);
    setPasswordSaved(false);
  };

  const resetProfile = () => {
    setProfile(initialProfileData);
    setProfileErrors({});
    setProfileSaved(false);
  };

  const resetPassword = () => {
    setPassword(initialPasswordData);
    setPasswordErrors({});
    setPasswordSaved(false);
  };

  const saveProfile = () => {
    // API call placeholder
    setProfileSaved(true);
  };

  const savePassword = () => {
    // API call placeholder
    setPasswordSaved(true);
    setPassword(initialPasswordData);
  };

  const isProfileInvalid = Object.values(profileErrors).some(Boolean);
  const isPasswordInvalid = Object.values(passwordErrors).some(Boolean);

  const inputBase =
    "w-full h-[44px] px-3 border rounded-lg bg-white transition-colors duration-200 focus:outline-none text-sm";
  const inputNormal = "border-gray-300 hover:border-gray-400 focus:border-black";
  const inputChanged = "border-black bg-gray-50";
  const inputError = "border-red focus:border-red";

  const getInputClass = (field: string, block: "profile" | "password") => {
    const errors = block === "profile" ? profileErrors : passwordErrors;
    const changed =
      block === "profile"
        ? profile[field as keyof typeof profile] !==
          initialProfileData[field as keyof typeof initialProfileData]
        : password[field as keyof typeof password] !== "";

    return `${inputBase} ${errors[field] ? inputError : changed ? inputChanged : inputNormal}`;
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto pb-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />

        <section className="flex-1 flex justify-center">
          <div className="w-full max-w-[720px] bg-white ">

            {/* ── Profile Block ── */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">
              Дані облікового запису
            </h2>

            {profileChanged && !profileSaved && (
              <p className="text-xs text-amber-600 mb-4">Є незбережені зміни</p>
            )}
            {profileSaved && (
              <p className="text-xs text-green-600 mb-4 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Зміни збережено
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {(["lastName", "firstName"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-600 font-medium">
                    {FIELD_LABELS[field]}
                  </label>
                  <input
                    name={field}
                    value={profile[field]}
                    onChange={handleProfileChange}
                    className={getInputClass(field, "profile")}
                  />
                  {profileErrors[field] && (
                    <span className="text-xs text-red">{profileErrors[field]}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {(["phone", "email"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-600 font-medium">
                    {FIELD_LABELS[field]}
                  </label>
                  <input
                    name={field}
                    type={field === "email" ? "email" : "tel"}
                    value={profile[field]}
                    onChange={handleProfileChange}
                    className={getInputClass(field, "profile")}
                  />
                  {profileErrors[field] && (
                    <span className="text-xs text-red">{profileErrors[field]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Profile action buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              {/* Скасувати видно тільки якщо є зміни і ще не збережено */}
              {profileChanged && !profileSaved && (
                <button
                  type="button"
                  onClick={resetProfile}
                  className="w-full sm:w-auto px-6 h-[44px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                >
                  Скасувати
                </button>
              )}
              <Button
                type="button"
                onClick={saveProfile}
                disabled={!profileChanged || isProfileInvalid || profileSaved}
                className={`w-full sm:w-auto px-8 h-[44px]  transition-all duration-300 text-sm font-medium ${
                  profileSaved
                    ? "bg-green-600 text-white cursor-default"
                    : !profileChanged || isProfileInvalid
                    ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {profileSaved ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Збережено
                  </span>
                ) : (
                  "Зберегти зміни"
                )}
              </Button>
            </div>

            {/* ── Password Block ── */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold mb-1">Зміна паролю</h3>

              {passwordChanged && !passwordSaved && (
                <p className="text-xs text-amber-600 mb-4">Є незбережені зміни</p>
              )}
              {passwordSaved && (
                <p className="text-xs text-green-600 mb-4 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Пароль змінено
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {(["oldPassword", "newPassword", "confirmPassword"] as const).map((field) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-600 font-medium">
                      {FIELD_LABELS[field]}
                    </label>
                    <input
                      type="password"
                      name={field}
                      value={password[field]}
                      onChange={handlePasswordChange}
                      className={getInputClass(field, "password")}
                    />
                    {passwordErrors[field] && (
                      <span className="text-xs text-red">{passwordErrors[field]}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                {/* Скасувати видно тільки якщо є зміни і ще не збережено */}
                {passwordChanged && !passwordSaved && (
                  <button
                    type="button"
                    onClick={resetPassword}
                    className="w-full sm:w-auto px-6 h-[44px]  border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    Скасувати
                  </button>
                )}
                <Button
                  type="button"
                  onClick={savePassword}
                  disabled={!passwordChanged || isPasswordInvalid || passwordSaved}
                  className={`w-full sm:w-auto px-8 h-[44px]  transition-all duration-300 text-sm font-medium ${
                    passwordSaved
                      ? "bg-green-600 text-white cursor-default"
                      : !passwordChanged || isPasswordInvalid
                      ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {passwordSaved ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Збережено
                    </span>
                  ) : (
                    "Змінити пароль"
                  )}
                </Button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </section>
  );
};

export default SettingsPage;