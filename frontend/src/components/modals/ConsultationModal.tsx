"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = "start" | "help" | "contact" | "done";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Phone helpers ─────────────────────────────────────────────────────────────

function validatePhone(phone: string): boolean {
  return /^\+380 \d{2} \d{3} \d{2} \d{2}$/.test(phone);
}

function applyPhoneMask(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("380")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 9);

  let result = "+380";
  if (digits.length > 0) result += " " + digits.slice(0, 2);
  if (digits.length > 2) result += " " + digits.slice(2, 5);
  if (digits.length > 5) result += " " + digits.slice(5, 7);
  if (digits.length > 7) result += " " + digits.slice(7, 9);
  return result;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [mounted, setMounted]           = useState(false);
  const [messages, setMessages]         = useState<Message[]>([]);
  const [step, setStep]                 = useState<Step>("start");
  const [isTyping, setIsTyping]         = useState(false);

  // "help" step
  const [messageText, setMessageText]   = useState("");

  // "contact" step — shared for both flows
  const [name, setName]                 = useState("");
  const [nameError, setNameError]       = useState("");
  const [phone, setPhone]               = useState("");
  const [phoneError, setPhoneError]     = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Which flow the user chose (stored so route.ts gets the right type)
  const flowRef = useRef<"consultation" | "callback">("consultation");
  // Help message text, captured before moving to contact step
  const helpMsgRef = useRef<string | null>(null);

  const messagesBoxRef = useRef<HTMLDivElement>(null);
  const msgIdRef       = useRef(0);
  const nextId         = () => ++msgIdRef.current;

  // ── Mount guard ───────────────────────────────────────────────────────────────
  useEffect(() => { setMounted(true); }, []);

  // ── Scroll messages box ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = messagesBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  // ── Body scroll lock (iOS-safe) ───────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position  = "fixed";
    document.body.style.top       = `-${scrollY}px`;
    document.body.style.left      = "0";
    document.body.style.right     = "0";
    document.body.style.overflowY = "scroll";
    return () => {
      document.body.style.position  = "";
      document.body.style.top       = "";
      document.body.style.left      = "";
      document.body.style.right     = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // ── Reset on close ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setMessages([]);
        setStep("start");
        setIsTyping(false);
        setMessageText("");
        setName("");
        setNameError("");
        setPhone("");
        setPhoneError("");
        setIsSubmitting(false);
        msgIdRef.current    = 0;
        helpMsgRef.current  = null;
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Initial greeting ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const greetings = ["👋 Вітаємо!", "Допоможемо підібрати меблі", "Що вас цікавить?"];
    let delay = 400;
    greetings.forEach((text, i) => {
      setTimeout(() => setIsTyping(true), delay);
      delay += 700;
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: nextId(), from: "bot", text }]);
      }, delay);
      delay += i === greetings.length - 1 ? 200 : 300;
    });
  }, [isOpen]);

  // ── Keyboard close ────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  // ── Bot message helper ────────────────────────────────────────────────────────
  const addBotMessage = (text: string, delay = 800): Promise<void> =>
    new Promise((resolve) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: nextId(), from: "bot", text }]);
        resolve();
      }, delay);
    });

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleChooseHelp = async () => {
    flowRef.current = "consultation";
    setMessages((prev) => [...prev, { id: nextId(), from: "user", text: "🎯 Підібрати меблі" }]);
    await addBotMessage("Що саме ви шукаєте?", 700);
    setStep("help");
  };

  const handleChooseCallback = async () => {
    flowRef.current = "callback";
    setMessages((prev) => [...prev, { id: nextId(), from: "user", text: "📞 Замовити дзвінок" }]);
    await addBotMessage("Залиште ваші контакти, і менеджер передзвонить вам.", 700);
    setStep("contact");
  };

  const handleSubmitHelp = async () => {
    if (!messageText.trim()) return;
    helpMsgRef.current = messageText.trim();
    setMessages((prev) => [...prev, { id: nextId(), from: "user", text: messageText.trim() }]);
    setMessageText("");
    await addBotMessage("Залиште ваші контакти для зв'язку:", 700);
    setStep("contact");
  };

  const isContactValid = name.trim().length > 0 && validatePhone(phone);

  const handleSubmitContact = async () => {
    let hasError = false;
    if (!name.trim()) { setNameError("Будь ласка, введіть ваше ім'я"); hasError = true; }
    if (!validatePhone(phone)) { setPhoneError("Формат: +380 XX XXX XX XX"); hasError = true; }
    if (hasError) return;

    setIsSubmitting(true);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: `${name.trim()}, ${phone.trim()}` },
    ]);

    try {
      await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: flowRef.current,
          name: name.trim(),
          message: helpMsgRef.current,
          phone: phone.trim(),
          source: "homepage",
        }),
      });
    } catch { /* fail silently */ }

    setName("");
    setPhone("");
    setStep("done");
    await addBotMessage("🔎 Приймаємо заявку...", 800);
    await addBotMessage(
      flowRef.current === "callback"
        ? "📞 Очікуйте дзвінка від менеджера!"
        : "✅ Менеджер зв'яжеться з вами найближчим часом!",
      900
    );
    setIsSubmitting(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  if (!mounted || !isOpen) return null;

  const modal = (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />

      {/* Centering shell */}
      <div
        className="fixed inset-0 flex items-end justify-center lg:items-center pointer-events-none"
        style={{ zIndex: 9999 }}
      >
        {/* Card */}
        <div
          className="pointer-events-auto flex flex-col bg-white shadow-2xl w-full  lg:w-[420px]"
          style={{ maxHeight: "min(600px, 85dvh)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8e8] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm select-none">
                🎧
              </div>
              <div>
                <p className="font-semibold text-[15px] leading-tight">Консультація</p>
                <p className="text-[12px] text-[#888] leading-tight">Cozy Corners</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f1f1] transition text-[#666] text-lg leading-none"
              aria-label="Закрити"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesBoxRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-[#fafafa]"
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={[
                    "px-4 py-2.5 rounded-2xl text-[14px] leading-[1.5] max-w-[80%] break-words",
                    msg.from === "bot"
                      ? "bg-[#f1f1f1] text-black rounded-tl-sm"
                      : "bg-black text-white rounded-tr-sm",
                  ].join(" ")}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#f1f1f1] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#aaa] inline-block animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          {!isTyping && (
            <div className="px-4 py-4 border-t border-[#e8e8e8] bg-white flex-shrink-0">

              {/* Step: start */}
              {step === "start" && messages.length >= 3 && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleChooseHelp}
                    className="w-full text-left px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-[14px] hover:bg-[#f1f1f1] transition"
                  >
                    🎯 Підібрати меблі
                  </button>
                  <button
                    onClick={handleChooseCallback}
                    className="w-full text-left px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-[14px] hover:bg-[#f1f1f1] transition"
                  >
                    📞 Замовити дзвінок
                  </button>
                </div>
              )}

              {/* Step: help — describe request */}
              {step === "help" && (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Наприклад: шукаю диван для вітальні до 15 000 ₴"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-[14px] resize-none focus:outline-none focus:border-black transition"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmitHelp(); }
                    }}
                  />
                  <Button onClick={handleSubmitHelp} disabled={!messageText.trim()} className="w-full">
                    Далі →
                  </Button>
                </div>
              )}

              {/* Step: contact — name + phone (both flows) */}
              {step === "contact" && (
                <div className="flex flex-col gap-2">
                  {/* Name */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(""); }}
                    placeholder="Як до вас звертатись?"
                    autoFocus
                    className={[
                      "w-full px-4 py-2.5 rounded-xl border text-[14px] focus:outline-none transition",
                      nameError ? "border-red focus:border-red" : "border-[#e0e0e0] focus:border-black",
                    ].join(" ")}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubmitContact(); }}
                  />
                  {nameError && <p className="text-red text-[12px]">{nameError}</p>}

                  {/* Phone */}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const masked = applyPhoneMask(e.target.value);
                      setPhone(masked);
                      setPhoneError(
                        masked.length > 4 && !validatePhone(masked)
                          ? "Формат: +380 XX XXX XX XX"
                          : ""
                      );
                    }}
                    placeholder="+380 XX XXX XX XX"
                    maxLength={17}
                    className={[
                      "w-full px-4 py-2.5 rounded-xl border text-[14px] focus:outline-none transition",
                      phoneError ? "border-red focus:border-red" : "border-[#e0e0e0] focus:border-black",
                    ].join(" ")}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubmitContact(); }}
                  />
                  {phoneError
                    ? <p className="text-red text-[12px]">{phoneError}</p>
                    : <p className="text-[#aaa] text-[12px]">Формат: +380 XX XXX XX XX</p>
                  }

                  <Button
                    onClick={handleSubmitContact}
                    disabled={isSubmitting || !isContactValid}
                    className="w-full"
                  >
                    {isSubmitting ? "Відправляємо..." : "Відправити заявку"}
                  </Button>
                </div>
              )}

              {/* Step: done */}
              {step === "done" && (
                <Button onClick={onClose} variant="second" className="w-full">
                  Закрити чат
                </Button>
              )}

            </div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}