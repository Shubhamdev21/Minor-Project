import axios from 'axios';
import Settings from '../models/Settings';

export const sendTelegramAlert = async (location: string, confidence: number, severity: string) => {
  try {
    const settings = await Settings.findOne();
    if (settings && !settings.telegramEnabled) return;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn('Telegram credentials not configured');
      return;
    }

    const message = `
 *INTRUDER ALERT* 

*Location:* ${location}
*Time:* ${new Date().toLocaleString()}
*Confidence:* ${confidence}%
*Severity:* ${severity}
    `;

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });

  } catch (error) {
    console.error('Failed to send Telegram alert:', error);
  }
};
/*
You create a Bot on Telegram (via @BotFather)
        ↓
Telegram gives you a TOKEN (like a password)
        ↓
Your code uses that token to send messages
        ↓
Messages appear in your Telegram chat


 Motion detected in simulator
        ↓
 Is telegramEnabled = true in DB?  →  NO → Stop
        ↓ YES
 Grab TOKEN + CHAT_ID from .env
        ↓
 Build alert message
        ↓
 POST request to Telegram API
        ↓
 You get notified on your phone!

*/