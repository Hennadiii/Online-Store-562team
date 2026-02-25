"use client";

import ProfileSidebar from "@/components/profile/sidebar";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto pb-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-20 mt-9">
        <ProfileSidebar />

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-sm p-5 sm:p-8">

            <h1 className="text-xl sm:text-2xl font-semibold mb-6">
              Мій профіль
            </h1>

            <div className="flex flex-col divide-y divide-gray-100">
              {[
                { label: "Імʼя та прізвище", value: "Марина Зоряна" },
                { label: "Email",             value: "marinzor@gmail.com" },
                { label: "Телефон",           value: "+380 (33) 219 00 33" },
              ].map(({ label, value }) => (
                <div key={label} className="py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <p className="text-xs text-gray-400 font-medium sm:w-44 shrink-0">{label}</p>
                  <p className="text-sm font-medium text-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 mt-2 border-t border-gray-100">
              <Link
                href="/profile/settings"
                className="inline-flex items-center gap-2 px-6 h-[44px] rounded-xl bg-black text-white text-sm font-medium transition-all duration-200 hover:bg-gray-800 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Редагувати дані
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;