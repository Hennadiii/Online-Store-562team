import SalesDetailsChart from "@/components/admin/adminSalesDetailsChart";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Еко Хоум",
    category: "Дивани",
    sales: 120,
    revenue: "1 320 000",
  },
  {
    id: 2,
    name: "Ортопед Плюс",
    category: "Ліжка",
    sales: 95,
    revenue: "1 425 000",
  },
  { id: 3, name: "Престиж", category: "Шафи", sales: 70, revenue: "350 000" },
  { id: 4, name: "Вердана", category: "Тумби", sales: 60, revenue: "135 000" },
  { id: 5, name: "Теракота", category: "Столи", sales: 80, revenue: "200 000" },
  { id: 6, name: "Модерн", category: "Люстри", sales: 50, revenue: "180 000" },
  { id: 7, name: "Модерн", category: "Люстри", sales: 50, revenue: "180 000" },
  { id: 8, name: "Модерн", category: "Люстри", sales: 50, revenue: "180 000" },
  { id: 9, name: "Модерн", category: "Люстри", sales: 50, revenue: "180 000" },
  { id: 10, name: "Модерн", category: "Люстри", sales: 50, revenue: "180 000" },
];

const AdminStatisticsPage = () => {
  return (
    <section className="flex flex-col gap-y-[17px] mb-10">
      <div className="flex gap-x-[37px]">
        <div>
          <div className="w-[512px] h-[472px] p-4 rounded-[14px] shadow-lg border">
            <h2 className="text-[#2E2E2E] text-base mb-4">Популярні товари</h2>
            <table className="w-full text-sm text-[#2E2E2E] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-grey text-[12px] text-left">
                  <th className="w-4">#</th>
                  <th>Назва товару</th>
                  <th>Категорія</th>
                  <th>Кількість продажів</th>
                  <th className="text-right">Дохід (₴)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr className="text-[16px]" key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.sales}</td>
                    <td className="text-right">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2 text-sm text-[#2E2E2E]">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`px-2 py-1 rounded ${
                    n === 2
                      ? "font-bold border-b-2 border-[#2E2E2E]"
                      : "text-[#B1B1B1]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[262px] h-[161px] p-4 rounded-[14px] shadow-lg border flex flex-col justify-between">
          <div className="flex justify-between gap-x-2">
            <p>Дохід</p>
            <div className="flex items-center gap-x-2 text-grey text-[12px]">
              <p>Тиждень</p>
              <Image width={24} height={24} src="/arrow-down.svg" alt="arrow" />
            </div>
          </div>
          <p className="text-[28px]">87,5 млн ₴</p>
          <div className="flex gap-x-2">
            <Image width={24} height={24} src="/green-arrow.svg" alt="arrow" />
            <p className="text-nowrap text-accent">1.3% Від минулого тижня </p>
          </div>
        </div>
        <div className="w-[262px] h-[161px] p-4 rounded-[14px] shadow-lg border flex items-start justify-between gap-x-2">
          <div className="flex flex-col gap-y-6">
            <p className="leading-[120%] text-[#202224]">Середній чек</p>
            <p className=" text-[28px]">40,689 ₴</p>
          </div>
          <Image width={51} height={51} src="/money.svg" alt="money" />
        </div>
      </div>

      <SalesDetailsChart />
    </section>
  );
};

export default AdminStatisticsPage;
