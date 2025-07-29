"use client";
import CategoryItem from "@/components/admin/adminCategoryItem";
import ModalWrapper from "@/components/shared/modalWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { disableScroll } from "@/utils/scrollbar";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    name: "Еко Хоум",
    category: "Дивани",
    price: "11 000 ₴",
    status: "В наявності",
    image: "/divan.png",
  },
  {
    name: "Престиж",
    category: "Ліжка",
    price: "25 000 ₴",
    status: "Немає",
    image: "/divan.png",
  },
  {
    name: "Леман",
    category: "Дивани",
    price: "22 000 ₴",
    status: "В наявності",
    image: "/divan.png",
  },
  {
    name: "Еко Хоум",
    category: "Дивани",
    price: "11 000 ₴",
    status: "В наявності",
    image: "/divan.png",
  },
  {
    name: "Еко Хоум",
    category: "Світильники",
    price: "5 000 ₴",
    status: "В наявності",
    image: "/divan.png",
  },
  {
    name: "Лофт Вуд",
    category: "Лампи",
    price: "2 000 ₴",
    status: "В наявності",
    image: "/divan.png",
  },
];

const categoryData = [
  "Дивани",
  "Ліжка",
  "Лампи",
  "Шафи",
  "Світильники",
  "Крісла",
  "Тумби",
  "Вази",
  "Столи",
  "Дзеркала",
  "Комоди",
  "Трюмо",
  "Аксесуари",
];

const AdminProductsClientPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  return (
    <section className="flex flex-col gap-y-8 pb-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="relative max-w-[318px] h-[28px] flex items-end">
            <input
              placeholder="Введіть свій запит"
              className="h-4 w-[283px] bg-transparent text-[12px] focus:outline-none border-b"
            />
            <Image width={24} height={24} alt="search-icon" src="/search.svg" />
          </div>
        </div>

        <div className="flex items-center gap-x-[34px] pr-[76px]">
          <div
            onClick={() => {
              disableScroll();
              setShowModal(true);
            }}
            className="w-[68px] h-10 shadow-md border p-[10px] bg-white rounded-[14px] flex items-center justify-center cursor-pointer"
          >
            <Image width={24} height={24} alt="add" src="/plus.svg" />
          </div>
          <div className="flex items-center gap-x-3 cursor-pointer">
            <p>Фільтр</p>
            <Image width={20} height={20} alt="filter" src="/arrow-down.svg" />
          </div>
        </div>
      </div>

      <div className="p-3 bg-white rounded-2xl shadow-md pt-7">
        <table className="w-full text-left  border-separate border-spacing-y-3 ">
          <thead className="text-black/30 font-normal text-[12px]">
            <tr>
              <th className="pl-5">Фото</th>
              <th>Назва товару</th>
              <th>Категорія</th>
              <th>Ціна</th>
              <th>Статус</th>
              <th className="pl-7">Дія</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="rounded-xl text-[20px]">
                <td className="w-[208px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={108}
                    height={100}
                    className=" w-[108px] h-[100px] object-contain bg-[#F9F9F9]"
                  />
                </td>
                <td className="text-[#2E2E2E] font-medium w-[195px]">
                  {product.name}
                </td>
                <td className="w-[181px]">{product.category}</td>
                <td className="w-[182px]">{product.price}</td>
                <td className="w-[222px]">{product.status}</td>
                <td>
                  <div className="flex items-center py-1 bg-white border w-fit rounded-[14px]">
                    <button className="p-1 rounded-full hover:bg-gray-200 transition">
                      <Image
                        width={24}
                        height={24}
                        src="/edit.svg"
                        alt="edit"
                      />
                    </button>
                    |
                    <button className="p-1 rounded-full hover:bg-red-100 transition">
                      <Image
                        width={24}
                        height={24}
                        src="/backet.svg"
                        alt="delete"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center px-4 text-[#8F8F8F] text-sm pb-4">
          <span className="cursor-not-allowed">Назад</span>
          <div className="flex gap-2 text-black">
            {[1, 2, 3, 4].map((page) => (
              <span
                key={page}
                className={`cursor-pointer px-2 py-1 rounded ${
                  page === 1 ? "text-[#2E2E2E] font-bold" : "hover:text-black"
                }`}
              >
                {page}
              </span>
            ))}
          </div>
          <span className="cursor-pointer">Вперед</span>
        </div>
      </div>

      <ModalWrapper
        center={true}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="bg-white w-[917px] rounded-[14px] px-[25px] py-[55px] h-[calc(100dvh-100px)] overflow-y-auto">
          <h1 className="text-[24px]">Додати товар</h1>
          <form className="mt-[45px]">
            <div className="flex gap-x-[50px]">
              <div className="flex flex-col gap-y-4 w-[353px] h-[218px]">
                <h2 className="text-[20px]">Завантажити фото</h2>
                <div className="flex flex-col justify-center items-center gap-y-[10px] w-[321px] h-[145px] border-[#d0d5dd] border-2 border-dashed">
                  <Image
                    width={32}
                    height={32}
                    src="/admin/cloud.svg"
                    alt="upload"
                  />
                  <p className="text-center text-[12px]">
                    Перегляньте та виберіть фото, які ви хочете завантажити з
                    вашого комп’ютера
                  </p>
                  <div className="rounded-[4px] w-8 h-8 bg-[#047857] flex items-center justify-center">
                    <div className="text-white text-[32px]">+</div>
                  </div>
                </div>
              </div>
              <div className="w-[45%]">
                <label className="text-accent text-[12px]">Назва товару*</label>
                <Input
                  className="max-w-[382px]"
                  placeholder="Введіть назву товару"
                />
              </div>
            </div>
            <div>
              <label className="text-accent text-[12px]">Вкажіть ціну*</label>
              <Input placeholder="Ціна" className="max-w-[382px]" />
            </div>
            <h3 className="text-[20px] mt-5">Виберіть категорію*</h3>
            <div className="w-[445px] h-[191px] p-3 rounded-[4px] border-[#e7eaee] border flex flex-wrap gap-x-2.5 gap-y-[14px]">
              {categoryData.map((item) => (
                <CategoryItem
                  key={item}
                  name={item}
                  active={item === category}
                  setActive={setCategory}
                />
              ))}
            </div>

            <div className="mt-[54px]">
              <h4 className="text-[20px] ">Детальний опис товару*</h4>
              <textarea
                placeholder="Опис"
                className="mt-2 text-[12px] w-[382px] h-[191px] p-3 rounded-[4px] border-[#e7eaee] resize-none border shadow-md focus:outline-none"
              ></textarea>
            </div>

            <div className="mt-[14px]">
              <h5 className="text-[12px] text-accent">Вкажіть статус*</h5>
              <select className="w-[382px] focus:outline-none border-b-2 border-accent h-[41px] text-grey">
                <option>Статус</option>
              </select>
            </div>

            <h5 className="text-[20px] mt-[54px]">Додаткові поля для меблів</h5>
            <div className=" grid grid-cols-2">
              {[
                "Матеріал",
                "Обивка",
                "Функціональність",
                "Колір",
                "Висота",
                "Ширина",
                "Глибина",
                "Підлокітники",
              ].map((item) => {
                return (
                  <div key={item} className="mt-[14px]">
                    <label className="text-[12px] text-accent">
                      Вкажіть {item}*
                    </label>
                    <Input
                      placeholder={
                        item === "Функціональність"
                          ? "Наприклад (розкладний)"
                          : item
                      }
                      className="w-[382px] focus:outline-none border-b-2 border-accent h-[41px] text-grey"
                    />
                  </div>
                );
              })}
            </div>

            <Button className="mt-[45px]" variant="black">
              Зберегти
            </Button>
          </form>
        </div>
      </ModalWrapper>
    </section>
  );
};

export default AdminProductsClientPage;
