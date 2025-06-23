"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

// Функция генерации случайной прибыли для демонстрации
const generateData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    profit: Math.floor(40000 + Math.random() * 500000),
  }));

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export default function SalesChart() {
  const [selectedMonth, setSelectedMonth] = useState("Червень");
  const [data, setData] = useState(generateData());

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    setData(generateData()); // при смене месяца — новые данные
  };

  return (
    <div className="relative w-[1107px] h-[444px] p-4 rounded-[14px] shadow-2xl border bg-white">
      {/* Верхняя панель с заголовком и выбором месяца */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Деталі продажу</h2>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* График */}
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3C767E" stopOpacity={0.65} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.18} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
            label={{
              value: "День",
              position: "insideBottomRight",
              offset: -10,
            }}
          />

          <YAxis
            domain={[0, 600000]}
            ticks={[10000, 20000, 50000, 100000, 200000, 400000, 600000]}
            tickFormatter={(value) => `₴${(value / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12 }}
            width={60}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />

          <Tooltip
            cursor={{ stroke: "#4379EE", strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#4379EE",
              borderRadius: "8px",
            }}
            formatter={(value) => [
              `₴${(value as number).toLocaleString()}`,
              "Дохід",
            ]}
            labelFormatter={(label) => `День ${label}`}
          />

          <Area
            type="monotone"
            dataKey="profit"
            stroke="#4379EE"
            strokeWidth={1.5}
            fill="url(#colorProfit)"
            dot={{ r: 2, stroke: "#4379EE", strokeWidth: 1, fill: "#4379EE" }}
            activeDot={{ r: 5, fill: "#4379EE" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
