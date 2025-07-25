"use client";
import { Input } from "@/components/ui/input";
import { orders, statusColors } from "@/data/admin/orders";
import Image from "next/image";
import Link from "next/link";


const ClientDetailPage = () => {

    return (
        <section className="relative py-10">
            <Link 
            className="absolute -left-5 -top-14 flex items-center gap-x-3 group"
            href={'/admin/clients'}>
                <Image
                className="group-hover:-translate-x-3 duration-300"
                width={18}
                height={29}
                src={"/admin/arrow-back.svg"}
                alt='go gack' />
                <p className="leading-[120%] text-[32px]">Деталі клієнта</p>
            </Link>

            <form className="grid grid-cols-2 bg-white max-w-[971px] h-[246px] py-[44px] px-5 rounded-[14px] w-full border shadow-md">
                <div className="w-[382px]">
                    <label className="text-[12px] text-accent">Прізвище</label>
                    <Input />
                </div>
                          <div className="w-[382px]">
                    <label className="text-[12px] text-accent">Прізвище</label>
                    <Input />
                </div>
                          <div className="w-[382px]">
                    <label className="text-[12px] text-accent">Прізвище</label>
                    <Input />
                </div>
                          <div className="w-[382px]">
                    <label className="text-[12px] text-accent">Прізвище</label>
                    <Input />
                </div>
            </form>

            <div className="mt-6 flex items-center justify-between gap-x-5 max-w-[971px] w-full ">
                <h1 className="text-[24px]">Історія замовлень</h1>
                <div className="flex gap-x-0.5">
                    <p>Фільтр</p>
                    <Image width={20} height={20} src='/arrow-down.svg' alt="arrow-down" />
                </div>
            </div>

            <div className="mt-2 bg-white p-2 rounded-xl w-full pb-6 border shadow-xl max-w-[971px]">
                <table className="w-full border-separate border-spacing-y-3 px-2">
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
}
 
export default ClientDetailPage;