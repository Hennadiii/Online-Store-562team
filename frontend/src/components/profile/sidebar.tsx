"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/twMerge";
import { useAuthContext } from "@/context/AuthContext";

const menuItems = [
  { label: "Мій профіль", href: "/profile" },
  { label: "Мої замовлення", href: "/profile/orders" },
  { label: "Дані облікового запису", href: "/profile/settings" },
  { label: "Адреси доставки", href: "/profile/address" },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <aside className="min-w-[220px]">
      <nav className="flex flex-col gap-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] transition-all duration-200",
                {
                  "text-black font-medium": isActive,
                  "text-gray-400 hover:text-black": !isActive,
                }
              )}
            >
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="text-[15px] text-left text-red-500 hover:text-red-700 transition-all duration-200 mt-4 pt-4 border-t border-gray-100"
        >
          Вийти
        </button>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;