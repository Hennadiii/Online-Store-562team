"use client";

import { useState, useEffect } from "react";
import ProfileSidebar from "@/components/profile/sidebar";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";

const FIELD_LABELS: Record<string, string> = {
  lastName: "Прізвище",
  firstName: "Імʼя",
  phone: "Телефон",
  email: "Email",
  oldPassword: "Старий пароль",
  newPassword: "Новий пароль",
  confirmPassword: "Підтвердіть новий пароль",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+380\d{9}$/;

const initialPasswordData = { oldPassword: "", newPassword: "", confirmPassword: "" };

const SettingsPage = () => {
  const [profile, setProfile] = useState({ lastName: "", firstName: "", phone: "", email: "" });
  const [originalProfile, setOriginalProfile] = useState({ lastName: "", firstName: "", phone: "", email: "" });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileApiError, setProfileApiError] = useState<string | null>(null);

  const [password, setPassword] = useState(initialPasswordData);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordApiError, setPasswordApiError] = useState<string | null>(null);

  useEffect(() => {
    authService.getMe().then((data) => {
      if (!data) return;
      const nameParts = data.name?.split(" ") || [];
      const initial = {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: data.phone || "",
        email: data.email || "",
      };
      setProfile(initial);
      setOriginalProfile(initial);
    });
  }, []);

  const profileChanged = JSON.stringify(profile) !== JSON.stringify(originalProfile);
  const passwordChanged = JSON.stringify(password) !== JSON.stringify(initialPasswordData);

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
        case "oldPassword":
          if (!value) error = "Введіть старий пароль";
          break;
        case "newPassword":
          if (value && value.length < 8) error = "Мінімум 8 символів";
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
    setProfileApiError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...password, [name]: value };
    setPassword(next);
    validateField(name, value, "password", next);
    setPasswordSaved(false);
    setPasswordApiError(null);
  };

  const saveProfile = async () => {
    setProfileLoading(true);
    setProfileApiError(null);
    try {
      const updated = await authService.updateProfile(profile);
      if (!updated) throw new Error("Порожня відповідь від сервера");
      const nameParts = updated.name?.split(" ") || [];
      const refreshed = {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: updated.phone || "",
        email: updated.email || "",
      };
      setOriginalProfile(refreshed);
      setProfile(refreshed);
      setProfileSaved(true);
    } catch (e: unknown) {
      setProfileApiError(e instanceof Error ? e.message : "Помилка збереження");
    } finally {
      setProfileLoading(false);
    }
  };

  const savePassword = async () => {
    setPasswordLoading(true);
    setPasswordApiError(null);
    try {
      await authService.changePassword({
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      });
      setPasswordSaved(true);
      setPassword(initialPasswordData);
      setPasswordErrors({});
    } catch (e: unknown) {
      // Якщо бекенд повернув "Невірний старий пароль" — показуємо під інпутом
      const msg = e instanceof Error ? e.message : "Помилка зміни паролю";
      if (msg.toLowerCase().includes("старий пароль") || msg.toLowerCase().includes("невірний")) {
        setPasswordErrors((prev) => ({ ...prev, oldPassword: msg }));
      } else {
        setPasswordApiError(msg);
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const isProfileInvalid = Object.values(profileErrors).some(Boolean);
  const isPasswordInvalid = Object.values(passwordErrors).some(Boolean);

  // Кнопка активна лише коли всі три поля заповнені та немає помилок
  const isPasswordFormReady =
    password.oldPassword.trim().length > 0 &&
    password.newPassword.length >= 8 &&
    password.confirmPassword === password.newPassword &&
    !isPasswordInvalid;

  const inputBase =
    "w-full h-[44px] px-3 border rounded-lg bg-white transition-colors duration-200 focus:outline-none text-sm";
  const inputNormal = "border-gray-300 hover:border-gray-400 focus:border-black";
  const inputChanged = "border-black bg-gray-50";
  const inputError = "border-red focus:border-red";

  const getInputClass = (field: string, block: "profile" | "password") => {
    const errors = block === "profile" ? profileErrors : passwordErrors;
    const changed =
      block === "profile"
        ? profile[field as keyof typeof profile] !== originalProfile[field as keyof typeof originalProfile]
        : password[field as keyof typeof password] !== "";
    return `${inputBase} ${errors[field] ? inputError : changed ? inputChanged : inputNormal}`;
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto pb-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />
        <section className="flex-1 flex justify-center">
          <div className="w-full max-w-[720px] bg-white">
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">Дані облікового запису</h2>

            {profileChanged && !profileSaved && (
              <p className="text-xs text-amber-600 mb-4">Є незбережені зміни</p>
            )}
            {profileSaved && <p className="text-xs text-green-600 mb-4">✓ Зміни збережено</p>}
            {profileApiError && <p className="text-xs text-red-600 mb-4">{profileApiError}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {(["lastName", "firstName"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-600 font-medium">{FIELD_LABELS[field]}</label>
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
                  <label className="text-xs text-gray-600 font-medium">{FIELD_LABELS[field]}</label>
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

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              {profileChanged && !profileSaved && (
                <button
                  type="button"
                  onClick={() => {
                    setProfile(originalProfile);
                    setProfileErrors({});
                    setProfileSaved(false);
                    setProfileApiError(null);
                  }}
                  className="w-full sm:w-auto px-6 h-[44px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                >
                  Скасувати
                </button>
              )}
              <Button
                type="button"
                onClick={saveProfile}
                disabled={!profileChanged || isProfileInvalid || profileSaved || profileLoading}
                className={`w-full sm:w-auto px-8 h-[44px] transition-all duration-300 text-sm font-medium ${
                  profileSaved
                    ? "bg-green-600 text-white cursor-default"
                    : !profileChanged || isProfileInvalid
                    ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {profileLoading ? "Збереження..." : profileSaved ? "✓ Збережено" : "Зберегти зміни"}
              </Button>
            </div>

            {/* Password section */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold mb-1">Зміна паролю</h3>
              {passwordSaved && <p className="text-xs text-green-600 mb-4">✓ Пароль змінено</p>}
              {passwordApiError && <p className="text-xs text-red-600 mb-4">{passwordApiError}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {(["oldPassword", "newPassword", "confirmPassword"] as const).map((field) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-600 font-medium">{FIELD_LABELS[field]}</label>
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
                {passwordChanged && !passwordSaved && (
                  <button
                    type="button"
                    onClick={() => {
                      setPassword(initialPasswordData);
                      setPasswordErrors({});
                      setPasswordSaved(false);
                      setPasswordApiError(null);
                    }}
                    className="w-full sm:w-auto px-6 h-[44px] border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                  >
                    Скасувати
                  </button>
                )}
                <Button
                  type="button"
                  onClick={savePassword}
                  disabled={!isPasswordFormReady || passwordSaved || passwordLoading}
                  className={`w-full sm:w-auto px-8 h-[44px] transition-all duration-300 text-sm font-medium ${
                    passwordSaved
                      ? "bg-green-600 text-white cursor-default"
                      : !isPasswordFormReady
                      ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {passwordLoading ? "Збереження..." : passwordSaved ? "✓ Збережено" : "Змінити пароль"}
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