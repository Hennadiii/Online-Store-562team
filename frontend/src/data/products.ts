export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  fullDescription: string;
  images: string[];
  category: string;
  popular?: boolean;
  producer: string;
  characteristics: {
    material: string;
    upholstery: string;
    functionality: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    title: "Диван Eco Home",
    price: 27000,
    description: "Диван у скандинавському стилі.",
    fullDescription:
      "Диван виготовлений із міцного металевого каркасу, що забезпечує довговічність. Ідеально підходить для сучасних інтер'єрів.",
    images: ["/ecoHome1.jpg", "/ecoHome3.jpg", "/ecoHome2.jpg"],
    category: "Дивани",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Металевий каркас",
      upholstery: "Еко шкіра",
      functionality: "Не розкладається",
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
    producer: "Cozy Corners",
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
    fullDescription: "Ідеальне рішення для сучасної квартири або офісу.",
    images: ["/Loft1.jpg"],
    category: "Крісла",
    popular: false,
    producer: "Cozy Corners",
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
    fullDescription: "Сучасна шафа з розпашними дверима.",
    images: ["/Modern.jpg"],
    category: "Шафи",
    popular: true,
    producer: "Cozy Corners",
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
    fullDescription: "Має 6 місткі шухляди.",
    images: ["/Oslo.jpg"],
    category: "Комоди",
    popular: false,
    producer: "Cozy Corners",
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
    fullDescription: "Ідеально підходить для мінімалістичного інтер'єру.",
    images: ["/Wood.jpg"],
    category: "Тумби",
    popular: true,
    producer: "Cozy Corners",
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
    fullDescription: "Поєднання комфорту та скандинавського дизайну.",
    images: ["/Nordic.jpg"],
    category: "Дивани",
    popular: false,
    producer: "Cozy Corners",
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
    fullDescription: "Підходить для класичних та сучасних інтер'єрів.",
    images: ["/Classic.jpg"],
    category: "Ліжка",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Дерево",
      upholstery: "Велюр",
      functionality: "Без підйомного механізму",
    },
  },
  {
    id: 9,
    title: "Диван Milano",
    price: 17800,
    description: "Сучасний диван з глибокою посадкою.",
    fullDescription:
      "Диван Milano створений для максимального комфорту. Ідеально підходить для просторої вітальні та сучасного інтер'єру.",
    images: ["/milano.jpg"],
    category: "Дивани",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Дерев'яний каркас",
      upholstery: "Тканина",
      functionality: "Розкладний",
    },
  },
  {
    id: 10,
    title: "Диван Verona",
    price: 16200,
    description: "Елегантний диван у світлих відтінках.",
    fullDescription:
      "Verona поєднує в собі мінімалізм та комфорт. Підходить для скандинавського стилю.",
    images: ["/verona.jpg"],
    category: "Дивани",
    popular: false,
    producer: "Cozy Corners",
    characteristics: {
      material: "Масив дерева",
      upholstery: "Велюр",
      functionality: "Нерозкладний",
    },
  },
  {
    id: 11,
    title: "Диван Kyiv",
    price: 18900,
    description: "Просторий диван для великої родини.",
    fullDescription:
      "Має м'які подушки та міцний каркас, що забезпечує довговічність.",
    images: ["/Kyiv.jpg"],
    category: "Дивани",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Дерево + метал",
      upholstery: "Рогожа",
      functionality: "Розкладний",
    },
  },
  {
    id: 12,
    title: "Диван Nordic Plus",
    price: 20500,
    description: "Стильний диван у скандинавському стилі.",
    fullDescription:
      "Nordic Plus відрізняється лаконічним дизайном та високим рівнем комфорту.",
    images: ["/Nordic Plus.jpg"],
    category: "Дивани",
    popular: false,
    producer: "Cozy Corners",
    characteristics: {
      material: "ДСП + дерево",
      upholstery: "Тканина",
      functionality: "Розкладний",
    },
  },
  {
    id: 13,
    title: "Диван Loft Pro",
    price: 17400,
    description: "Диван у стилі Loft з металевими ніжками.",
    fullDescription:
      "Ідеальний варіант для сучасних інтер'єрів у стилі Loft або мінімалізм.",
    images: ["/Loft Pro.jpg"],
    category: "Дивани",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Метал + дерево",
      upholstery: "Велюр",
      functionality: "Нерозкладний",
    },
  },
  {
    id: 14,
    title: "Диван Comfort XL",
    price: 22900,
    description: "Максимальний комфорт для великої вітальні.",
    fullDescription:
      "Comfort XL має широке сидіння та м'які подушки, що забезпечують зручність протягом дня.",
    images: ["/Comfort XL.jpg"],
    category: "Дивані",
    popular: false,
    producer: "Cozy Corners",
    characteristics: {
      material: "Масив дерева",
      upholstery: "Тканина",
      functionality: "Розкладний",
    },
  },
  {
    id: 15,
    title: "Диван Urban",
    price: 16800,
    description: "Компактний диван для міської квартири.",
    fullDescription:
      "Urban чудово підходить для невеликих приміщень, поєднуючи стиль та функціональність.",
    images: ["/Urban.jpg"],
    category: "Дивані",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Дерев'яний каркас",
      upholstery: "Рогожа",
      functionality: "Розкладний",
    },
  },
  {
    id: 16,
    title: "Диван Prestige",
    price: 24500,
    description: "Преміальний диван з м'якою оббивкою.",
    fullDescription:
      "Prestige — це поєднання розкоші, комфорту та сучасного дизайну.",
    images: ["/Prestige.jpg"],
    category: "Дивані",
    popular: true,
    producer: "Cozy Corners",
    characteristics: {
      material: "Масив дерева",
      upholstery: "Велюр преміум",
      functionality: "Розкладний",
    },
  },
];