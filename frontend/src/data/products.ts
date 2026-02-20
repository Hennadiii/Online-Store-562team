export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    popular?: boolean;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      title: "Ліжко Еко Хоум",
      price: 11000,
      image: "/divan.png",
      category: "Дивани",
      popular: true,
    },
    {
      id: 2,
      title: "Ліжко Soft",
      price: 18500,
      image: "/Soft.jpg",
      category: "Ліжка",
      popular: true,
    },
    {
      id: 3,
      title: "Крісло Loft",
      price: 7600,
      image: "/Loft1.jpg",
      category: "Крісла",
      popular: false,
    },
    {
      id: 4,
      title: "Шафа Modern",
      price: 21000,
      image: "/Modern.jpg",
      category: "Шафи",
      popular: true,
    },
    {
      id: 5,
      title: "Комод Oslo",
      price: 9800,
      image: "/Oslo.jpg",
      category: "Комоди",
      popular: false,
    },
    {
      id: 6,
      title: "Тумба Wood",
      price: 4500,
      image: "/Wood.jpg",
      category: "Тумби",
      popular: true,
    },
    {
      id: 7,
      title: "Диван Nordic",
      price: 15900,
      image: "/divan2.png",
      category: "Дивани",
      popular: false,
    },
    {
      id: 8,
      title: "Ліжко Classic",
      price: 19500,
      image: "/Classic.jpg",
      category: "Ліжка",
      popular: true,
    },
  ];
  