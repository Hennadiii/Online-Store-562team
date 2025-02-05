import AnimatedSection from "@/components/shared/animatedSection";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Cozy Corners | Контакти",
  description: "Офіційни Контакти нашого сайту.",
};

const ContactsPage = () => {
  return (
    <AnimatedSection>
      <h1 className="text-h3 leading-[120%] text-justify mt-[60px] flex justify-center">
        Контакти
      </h1>

      <div className="mt-7 flex gap-x-[110px]">
        <div className="max-w-[624px] w-full">
          <p className="font-semibold">Ми завжди на звʼязку!</p>
          <p className="mt-12 leading-[120%]">
            Ми відповідаємо на всі ваші запити через телефон або електронну
            пошту. Зателефонуйте за номерами, вказаними у нижній частині сайту,
            або надішліть листа на нашу пошту. Ваше питання не залишиться без
            уваги!
          </p>
          <p className="mt-3">
            <span className="font-semibold">Наш телефон:</span>
            <span className="underline text-accent ml-1 font-semibold">
              +380( 011) 621 16 12
            </span>
          </p>
          <p className="mt-3">
            <span className="font-semibold ">Наша пошта:</span>{" "}
            <span className="underline text-accent  font-semibold">
              cozycorners@gmail.com
            </span>
          </p>
        </div>
        <form className="max-w-[547px] w-full flex flex-col gap-y-6">
          <div className="h-[62px] flex flex-col gap-y-[10px]">
            <label className="text-[12px] text-accent">Імʼя</label>
            <input
              className="h-[41px] p-2 border-b border-black"
              placeholder="Введіть ваше імʼя"
            />
          </div>
          <div className="h-[62px] flex flex-col gap-y-[10px]">
            <label className="text-[12px] text-accent">Email</label>
            <input
              className="h-[41px] p-2 border-b border-black"
              placeholder="Введіть ваше email"
            />
          </div>
          <textarea
            className="h-[100px] border-black border-b resize-none p-2 mt-1"
            placeholder="Текст повідомлення"
          />

          <Button className="mt-4 border-black">відправити</Button>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default ContactsPage;
