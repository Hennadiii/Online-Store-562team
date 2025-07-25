"use client";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import TovarIcon from "@/assets/admin/tovar.svg";
import SpiskiIcon from "@/assets/admin/spiski.svg";
import ClientsIcon from "@/assets/admin/clients.svg";
import StatisticsIcon from "@/assets/admin/statistics.svg";
import SettingsIcon from "@/assets/admin/settings.svg";
import ExitIcon from "@/assets/admin/exit.svg";
import { navTo } from "@/utils/navigations";

const navItems = [
  {
    href: navTo.adminProducts,
    Icon: TovarIcon,
    label: "Товари",
    alt: "Товари іконка",
  },
  {
    href: navTo.adminOrders,
    Icon: SpiskiIcon,
    label: "Списки замовлень",
    alt: "Списки замовлень іконка",
  },
  {
    href: navTo.adminClients,
    Icon: ClientsIcon,
    label: "Клієнти",
    alt: "Клієнти іконка",
  },
  {
    href: navTo.adminStatistics,
    Icon: StatisticsIcon,
    label: "Статистика",
    alt: "Статистика іконка",
  },
  {
    href: navTo.adminSettings,
    Icon: SettingsIcon,
    label: "Налаштування",
    alt: "Налаштування іконка",
  },
  { href: "#", Icon: ExitIcon, label: "Вийти", alt: "Вийти іконка" },
];

const AdminSidebar = () => {
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const index = navItems.findIndex((item) => item.href === pathname);
    const item = itemRefs.current[index];

    if (item) {
      setIndicatorTop(item.offsetTop);
    }
  }, [pathname]);

  return (
    <aside className="max-w-[267px] w-full fixed left-0 top-0 h-screen flex flex-col items-center bg-white shadow-lg">
      <Image
        className="mt-[47px]"
        width={111}
        height={76}
        src="/logo.svg"
        alt="Логотип"
      />

      <nav className="mt-[69px] w-full relative">
        {/* Active Indicator */}
        <div
          className={`${indicatorTop === null ? '-left-5': 'left-0'}  absolute w-[9px] h-[50px] bg-accent rounded-[4px] transition-all duration-300`}
          style={{ top: indicatorTop ?? '' }}
        />

        <ul className="flex flex-col gap-y-[22px]">
          {navItems.map(({ href, Icon, label, alt }, idx) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link key={label} href={href}>
                <li
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`
                    ${label === "Налаштування" && "mt-[57px]"}
                    ml-[26px] mr-[14px] py-[13px] rounded-[6px]
                    ${isActive ? "bg-accent text-white" : "hover:bg-accent/50"}
                    cursor-pointer transition-colors duration-300 relative
                  `}
                >
                  <div className="flex items-center gap-3 ml-[30px] relative z-10">
                    <Icon
                      aria-label={alt}
                      className={`${isActive ? "text-white" : ""} h-6 w-6`}
                    />
                    <span className="text-nowrap">{label}</span>
                  </div>

                  {label === "Статистика" && (
                    <hr className="h-[1px] w-full left-0 absolute bottom-[-40px] bg-[#e0e0e0]" />
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
