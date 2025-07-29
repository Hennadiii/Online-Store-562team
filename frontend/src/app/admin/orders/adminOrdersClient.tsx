"use client";
import Calendar from "@/components/admin/adminCalendar";
import AdminStatusFilter from "@/components/admin/adminStatusFilter";
import { orders, statusColors } from "@/data/admin/orders";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";

const AdminOrdersClientPage = () => {
  const refCalendar = useRef<HTMLDivElement>(null);
  const refStatus = useRef<HTMLDivElement>(null);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);

  useClickOutside(refCalendar, () => setOpenCalendar(false));
  useClickOutside(refStatus, () => setOpenStatus(false));

  return (
    <section className="flex flex-col pb-10 gap-y-[30px]">
      <div className="flex items-center justify-between gap-x-3">
        <div className="w-[570px] px-[20px] relative py-[10px] h-[90px] bg-white border rounded-[14px] flex items-center">
          <div className="flex items-center gap-x-8 cursor-pointer">
            <Image width={22} height={24} src="/filter.svg" alt="filter" />
            <p className="text-nowrap">Фільтр по</p>
          </div>
          <div
            ref={refCalendar}
            className="border-l ml-[34px] h-full items-center justify-center flex"
          >
            <Calendar open={openCalendar} />
            <div
              onClick={() => setOpenCalendar((prev) => !prev)}
              className="flex px-[25px] gap-x-6 cursor-pointer"
            >
              <p className={openCalendar ? "text-grey" : "text-black"}>Дата</p>
              <Image
                width={20}
                height={20}
                src={"/arrow-down.svg"}
                alt="arrow"
              />
            </div>
          </div>
          <div
            ref={refStatus}
            className="border-l h-full items-center justify-center flex"
          >
            <AdminStatusFilter open={openStatus} />
            <div
              onClick={() => setOpenStatus((prev) => !prev)}
              className="flex px-[25px] gap-x-6 cursor-pointer"
            >
              <p className={openStatus ? "text-grey" : "text-black"}>Статус</p>
              <Image
                width={20}
                height={20}
                src={"/arrow-down.svg"}
                alt="arrow"
              />
            </div>
          </div>
          <div className="border-l h-full items-center justify-center flex">
            <div className="flex px-2 gap-x-2 cursor-pointer">
              <Image width={20} height={20} src={"/reset.svg"} alt="arrow" />
              <p className=" text-red/50">Скинути</p>
            </div>
          </div>
        </div>
        <div className="pr-[68px]">
          <div className="relative max-w-[318px] h-[28px] flex items-end">
            <input
              placeholder="Введіть свій запит"
              className="h-4 w-[283px] bg-transparent text-[12px] focus:outline-none border-b"
            />
            <Image width={24} height={24} alt="search-icon" src="/search.svg" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl w-full pb-6 border shadow-xl">
        <table className="w-full border-separate border-spacing-y-3 border-spacing-x-8">
          <thead>
            <tr className="text-[#B1B1B1] text-sm text-left">
              <th>Номер</th>
              <th>Клієнт</th>
              <th className="text-center">Адреса</th>
              <th className="text-center">Дата</th>
              <th className="text-center">Сума</th>
              <th className="text-center">Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className=" text-[#2E2E2E] rounded-lg text-[20px]">
                <td className="py-3 w-[109px]">{order.number}</td>
                <td className="w-[203px]">{order.client}</td>
                <td className="w-[253px]">{order.address}</td>
                <td className="text-center w-[183px]">{order.date}</td>
                <td className="text-center text-nowrap w-[207px]">
                  {order.amount}
                </td>
                <td className="text-center">
                  <div
                    className={`px-3 py-1 text-xs font-medium h-[34px] flex items-center justify-center ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 px-2 text-[#8F8F8F] text-sm">
          <button className="cursor-not-allowed">Назад</button>
          <div className="flex gap-2 text-black">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className={`px-2 py-1 rounded ${
                  n === 1 ? "text-[#2E2E2E] font-bold" : "hover:text-black"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <button className="cursor-pointer">Вперед</button>
        </div>
      </div>
    </section>
  );
};

export default AdminOrdersClientPage;
