type Order = {
  number: string;
  client: string;
  address: string;
  date: string;
  amount: string;
  status: "Нове" | "Прийнято" | "Отримано" | "Повернено";
};

export const statusColors: Record<Order["status"], string> = {
  Нове: "bg-[#E6DEFF] text-[#7E6BC4]",
  Прийнято: "bg-[#FFE5C2] text-[#E29933]",
  Отримано: "bg-[#C6EBD5] text-[#3D8B5D]",
  Повернено: "bg-[#FFD6D6] text-[#C84C4C]",
};

export const orders: Order[] = [
  {
    number: "00040",
    client: "Іван Петров",
    address: "м. Київ, вул. Лесі Українки, 15",
    date: "05.02.2025",
    amount: "42 500 грн",
    status: "Нове",
  },
  {
    number: "03321",
    client: "Олексій Бондаренко",
    address: "м. Київ, вул. Грушевського, 10",
    date: "04.02.2025",
    amount: "28 700 грн",
    status: "Прийнято",
  },
  {
    number: "21330",
    client: "Максим Коваленко",
    address: "м. Київ,вул. Личаківська, 102",
    date: "04.02.2025",
    amount: "28 700 грн",
    status: "Прийнято",
  },
  {
    number: "28760",
    client: "Ольга Ткачук",
    address: "м. Київ,вул. Велика Васильківська, 15",
    date: "29.01.2025",
    amount: "33 900 грн",
    status: "Отримано",
  },
  {
    number: "21230",
    client: "Олена Смирнова",
    address: "м. Київ,вул. Драгоманова, 8",
    date: "07.02.2025",
    amount: "33 900 грн",
    status: "Нове",
  },
  {
    number: "21830",
    client: "Максим Коваленко",
    address: "м. Київ,вул. Героїв Дніпра, 5",
    date: "07.02.2025",
    amount: "33 900 грн",
    status: "Нове",
  },
  {
    number: "91340",
    client: "Іван Петров",
    address: "м. Київ,бульвар Лесі Українки, 30",
    date: "07.02.2025",
    amount: "33 900 грн",
    status: "Повернено",
  },
  {
    number: "91340",
    client: "Іван Петров",
    address: "м. Київ,бульвар Лесі Українки, 30",
    date: "07.02.2025",
    amount: "33 900 грн",
    status: "Повернено",
  },
  {
    number: "91340",
    client: "Іван Петров",
    address: "м. Київ,бульвар Лесі Українки, 30",
    date: "07.02.2025",
    amount: "33 900 грн",
    status: "Отримано",
  },
];
