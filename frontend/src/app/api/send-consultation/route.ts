import { NextRequest, NextResponse } from "next/server";

interface ConsultationPayload {
  type: "consultation" | "callback";
  name: string | null;
  message: string | null;
  phone: string;
  source: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ConsultationPayload = await req.json();

    if (!body.phone) {
      return NextResponse.json(
        { error: "Номер телефону обов'язковий" },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json({ error: "Сервіс тимчасово недоступний" }, { status: 500 });
    }

    const typeLabel = body.type === "callback" ? "Дзвінок" : "Підбір меблів";

    const text = [
      "🎧 *Нова консультація*",
      "",
      `📌 Тип: ${typeLabel}`,
      "",
      "👤 Ім'я:",
      body.name ?? "—",
      "",
      "📞 Телефон:",
      body.phone,
      "",
      "💬 Повідомлення:",
      body.message ?? "—",
      "",
      `🌐 Джерело: ${body.source ?? "Home Page"}`,
    ].join("\n");

    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
      }
    );

    if (!tgRes.ok) {
      console.error("Telegram API error:", await tgRes.text());
      return NextResponse.json({ error: "Помилка відправки" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-consultation error:", err);
    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}