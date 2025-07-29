"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  lastOrderDate: string;
};

const clients: Client[] = [
  {
    id: 1,
    name: "Іван Петров",
    email: "ivan.petrov@gmail.com",
    phone: "+380501234567",
    orders: 15,
    lastOrderDate: "2024-02-01",
  },
  {
    id: 2,
    name: "Олена Смирнова",
    email: "olena.smirnova@ukr.net",
    phone: "+380671112233",
    orders: 7,
    lastOrderDate: "2024-01-28",
  },
  {
    id: 3,
    name: "Максим Коваленко",
    email: "maksim.kov@gmail.com",
    phone: "+380931234567",
    orders: 2,
    lastOrderDate: "2023-12-15",
  },
  {
    id: 4,
    name: "Анна Шевченко",
    email: "anna.sh@gmail.com",
    phone: "+380661112233",
    orders: 10,
    lastOrderDate: "2024-01-30",
  },
  {
    id: 5,
    name: "Олексій Бондаренко",
    email: "oleksii.b@meta.com",
    phone: "+380503334531",
    orders: 10,
    lastOrderDate: "2024-01-30",
  },
  {
    id: 6,
    name: "Олексій Бондаренко",
    email: "oleksii.b@meta.com",
    phone: "+380503334531",
    orders: 10,
    lastOrderDate: "2024-01-30",
  },
  {
    id: 7,
    name: "Олексій Бондаренко",
    email: "oleksii.b@meta.com",
    phone: "+380503334531",
    orders: 10,
    lastOrderDate: "2024-01-30",
  },
  {
    id: 8,
    name: "Олексій Бондаренко",
    email: "oleksii.b@meta.com",
    phone: "+380503334531",
    orders: 1,
    lastOrderDate: "2024-01-30",
  },
  {
    id: 9,
    name: "Олексій Бондаренко",
    email: "oleksii.b@meta.com",
    phone: "+380503334531",
    orders: 10,
    lastOrderDate: "2024-01-30",
  },
];

const ClientsPage = () => {
  const router = useRouter();

  return (
    <section className=" pt-8 flex flex-col gap-y-[45px] mb-10">
      <div>
        <div className="relative max-w-[318px] h-[28px] flex items-end">
          <input
            placeholder="Введіть свій запит"
            className="h-4 w-[283px] bg-transparent text-[12px] focus:outline-none border-b"
          />
          <Image width={24} height={24} alt="search-icon" src="/search.svg" />
        </div>
      </div>

      <div className="py-6 px-4 rounded-[14px] border w-full bg-white shadow-2xl ">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#B1B1B1] text-sm text-left">
              <th className="pl-2">#</th>
              <th className="pl-[41px] w-[130px]">Імʼя</th>
              <th className="text-center">Email</th>
              <th className="text-center">Телефон</th>
              <th className="text-center">Замовлення</th>
              <th className="text-center">Останнє замовлення</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                onClick={() => router.push(`clients/${client.id}`)}
                key={client.id}
                className="bg-white text-[#2E2E2E] rounded-[50%] easy-in-out hover:text-white duration-200 transition-colors text-[20px] hover:bg-accent cursor-pointer"
              >
                <td className="py-3 pl-2 rounded-l-[14px]">{client.id}</td>
                <td className="pl-[41px]">{client.name}</td>
                <td className="text-center">{client.email}</td>
                <td className="text-center">{client.phone}</td>
                <td className="text-center">{client.orders}</td>
                <td className="text-center rounded-r-[14px]">
                  {client.lastOrderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 px-2 text-[#8F8F8F] text-sm pb-4">
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

export default ClientsPage;
