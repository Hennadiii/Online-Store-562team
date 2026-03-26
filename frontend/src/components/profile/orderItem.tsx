import Image from "next/image";
import Link from "next/link";
import { Order } from "@/@types/order";

interface Props {
  order: Order;
}

const ProfileOrderItem: React.FC<Props> = ({ order }) => {
  // Бекенд повертає UTC без "Z" → додаємо щоб браузер правильно конвертував в локальний час
  const utcString = order.createdAt.endsWith("Z") ? order.createdAt : order.createdAt + "Z";
  const date = new Date(utcString).toLocaleString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="
      w-full
      border border-gray-200
      rounded-2xl
      p-4 sm:p-6
      bg-white
      hover:shadow-md
      transition
    ">

      {/* Верхняя строка */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="font-semibold text-[16px]">
            Замовлення № {order.id}
          </p>
          <p className="text-sm text-gray-500">
            {date}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semibold">
            {order.totalAmount.toLocaleString("uk-UA")} ₴
          </p>

          <div className="
            px-3 h-[32px]
            bg-[#E6DEFF]
            rounded-full
            flex items-center
          ">
            <span className="text-xs text-[#7E6BC4] font-medium">
              Нове
            </span>
          </div>
        </div>
      </div>

      {/* Фото товаров */}
      <div className="
        flex gap-3
        mt-5
        overflow-x-auto
        pb-2
      ">
        {order.items.slice(0, 3).map((item) => (
          <div
            key={item.productId}
            className="
              min-w-[80px]
              h-[80px]
              sm:min-w-[100px]
              sm:h-[100px]
              bg-gray-100
              rounded-xl
              overflow-hidden
              flex items-center justify-center
            "
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.title}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Кнопка */}
      <div className="mt-4 flex justify-end">
        <Link
          href={`/orders/${order.id}`}
          className="
            text-sm
            font-semibold
            underline
            hover:opacity-70
            transition
          "
        >
          Детальніше
        </Link>
      </div>
    </article>
  );
};

export default ProfileOrderItem;