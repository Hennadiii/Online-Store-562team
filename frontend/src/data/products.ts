export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    fullDescription: string;
    images: string[];
    category: string;
    popular?: boolean;
    characteristics: {
      material: string;
      upholstery: string;
      functionality: string;
    };
  }
  
  export const products: Product[] = [
    {
      id: 1,
      title: "Диван Еко Хоум",
      price: 27000,
      description: "Диван у скандинавському стилі.",
      fullDescription:
        "Диван виготовлений із міцного металевого каркасу, що забезпечує довговічність. Ідеально підходить для сучасних інтер'єрів.",
      images: ["/ecoHome1.jpg", "/ecoHome3.jpg","/ecoHome2.jpg", ],
      category: "Дивани",
      popular: true,
      characteristics: {
        material: "Металевий каркас",
        upholstery: "Еко шкіра",
        functionality: "Розкладний",
      },
    },
    {
      id: 2,
      title: "Ліжко Soft",
      price: 18500,
      description: "Комфортне двоспальне ліжко.",
      fullDescription:
        "Ліжко Soft створене для максимального комфорту та здорового сну.",
      images: ["/Soft.jpg"],
      category: "Ліжка",
      popular: true,
      characteristics: {
        material: "МДФ + дерево",
        upholstery: "Тканина",
        functionality: "З підйомним механізмом",
      },
    },
    {
      id: 3,
      title: "Крісло Loft",
      price: 7600,
      description: "Стильне крісло в стилі Loft.",
      fullDescription:
        "Ідеальне рішення для сучасної квартири або офісу.",
      images: ["/Loft1.jpg"],
      category: "Крісла",
      popular: false,
      characteristics: {
        material: "Метал + дерево",
        upholstery: "Рогожа",
        functionality: "Нерозкладне",
      },
    },
    {
      id: 4,
      title: "Шафа Modern",
      price: 21000,
      description: "Містка шафа для зберігання.",
      fullDescription:
        "Сучасна шафа з розпашними дверима.",
      images: ["/Modern.jpg"],
      category: "Шафи",
      popular: true,
      characteristics: {
        material: "ЛДСП",
        upholstery: "—",
        functionality: "Розпашні двері",
      },
    },
    {
      id: 5,
      title: "Комод Oslo",
      price: 9800,
      description: "Компактний комод для спальні.",
      fullDescription:
        "Має 6 місткі шухляди.",
      images: ["/Oslo.jpg"],
      category: "Комоди",
      popular: false,
      characteristics: {
        material: "ДСП",
        upholstery: "—",
        functionality: "6 шухляд",
      },
    },
    {
      id: 6,
      title: "Тумба Wood",
      price: 4500,
      description: "Лаконічна тумба з натурального дерева.",
      fullDescription:
        "Ідеально підходить для мінімалістичного інтер'єру.",
      images: ["/Wood.jpg"],
      category: "Тумби",
      popular: true,
      characteristics: {
        material: "Натуральне дерево",
        upholstery: "—",
        functionality: "З полицею",
      },
    },
    {
      id: 7,
      title: "Диван Nordic",
      price: 15900,
      description: "Просторий диван у зелених тонах.",
      fullDescription:
        "Поєднання комфорту та скандинавського дизайну.",
      images: ["/Nordic.jpg"],
      category: "Дивани",
      popular: false,
      characteristics: {
        material: "Дерев'яний каркас",
        upholstery: "Тканина",
        functionality: "Не розкладається",
      },
    },
    {
      id: 8,
      title: "Ліжко Classic",
      price: 19500,
      description: "Класичне ліжко з м'яким узголів'ям.",
      fullDescription:
        "Підходить для класичних та сучасних інтер'єрів.",
      images: ["/Classic.jpg"],
      category: "Ліжка",
      popular: true,
      characteristics: {
        material: "Дерево",
        upholstery: "Велюр",
        functionality: "Без підйомного механізму",
      },
    },
  ];
  