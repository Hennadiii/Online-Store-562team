"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast, showToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("Сервіс в розробці");
    setEmail("");
  };

  return (
    <div className="mt-8 sm:mt-[105px] flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[40px] w-full border-b-[1px] px-2 focus:outline-none"
          placeholder="Email"
        />
        <Button type="submit" className="w-full" variant="black">
          Відправити
        </Button>
      </form>

      <Toast toast={toast} />
    </div>
  );
};

export default EmailForm;