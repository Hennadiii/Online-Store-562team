"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

const ContactForm: React.FC = () => {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const { toast, showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("Сервіс в розробці");
    setFields({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full lg:max-w-[547px] flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        <div className="group flex flex-col gap-2">
          <label className="text-sm text-accent transition-all group-focus-within:text-black">
            Імʼя
          </label>
          <input
            name="name"
            required
            value={fields.name}
            onChange={handleChange}
            className="w-full h-[48px] px-3 border-b border-black/40
              focus:border-black focus:outline-none
              transition-all duration-300
              placeholder:text-black/40"
            placeholder="Введіть ваше імʼя"
          />
        </div>

        <div className="group flex flex-col gap-2">
          <label className="text-sm text-accent transition-all group-focus-within:text-black">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange}
            className="w-full h-[48px] px-3 border-b border-black/40
              focus:border-black focus:outline-none
              transition-all duration-300
              placeholder:text-black/40"
            placeholder="Введіть ваше email"
          />
        </div>

        <div className="group flex flex-col gap-2">
          <label className="text-sm text-accent transition-all group-focus-within:text-black">
            Повідомлення
          </label>
          <textarea
            name="message"
            required
            value={fields.message}
            onChange={handleChange}
            className="w-full min-h-[120px] px-3 py-2 border-b border-black/40
              focus:border-black focus:outline-none
              transition-all duration-300
              resize-none
              placeholder:text-black/40"
            placeholder="Текст повідомлення"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 w-full lg:w-auto border-black
            hover:bg-black hover:text-white
            transition-all duration-300"
        >
          Відправити
        </Button>

      </form>

      <Toast toast={toast}  />
    </div>
  );
};

export default ContactForm;