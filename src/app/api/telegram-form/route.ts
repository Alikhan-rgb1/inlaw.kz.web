import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, question, utm } = await request.json();

    if (!name || !phone || !question) {
      return NextResponse.json({ error: 'Name, phone, and question are required.' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set.');
      return NextResponse.json({ error: 'Telegram bot not configured.' }, { status: 500 });
    }

    let message = `Новая заявка с сайта:\n\nИмя: ${name}\nТелефон: ${phone}\nВопрос: ${question}`;

    if (Object.keys(utm).length > 0) {
      message += `\n\nUTM метки:\n`;
      for (const key in utm) {
        message += `${key}: ${utm[key]}\n`;
      }
    }

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML', // Можно использовать Markdown или HTML
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Error sending message to Telegram:', errorData);
      return NextResponse.json({ error: 'Failed to send message to Telegram.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
