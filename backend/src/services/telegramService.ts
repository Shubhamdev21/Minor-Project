import axios from "axios";
import Settings from "../models/Settings";
import Subscriber from "../models/Subscriber";

export const sendTelegramAlert = async (location: string, confidence: number, severity: string) => {
  try {
    const settings = await Settings.findOne();
    if (settings && !settings.telegramEnabled) return;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.warn("Telegram token not configured");
      return;
    }

    const message = `
?? *INTRUDER ALERT* ??

*Location:* ${location}
*Time:* ${new Date().toLocaleString()}
*Confidence:* ${confidence}%
*Severity:* ${severity}
    `;

    // Send to owner
    const ownerChatId = process.env.TELEGRAM_CHAT_ID;
    if (ownerChatId) {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: ownerChatId,
        text: message,
        parse_mode: "Markdown"
      });
    }

    // Send to ALL subscribers
    const subscribers = await Subscriber.find();
    for (const subscriber of subscribers) {
      try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
          chat_id: subscriber.chatId,
          text: message,
          parse_mode: "Markdown"
        });
        console.log(`Alert sent to subscriber: ${subscriber.name || subscriber.chatId}`);
      } catch (err: any) {
        console.error(`Failed to send to ${subscriber.chatId}: ${err.message}`);
      }
    }

    console.log(`Telegram alerts sent to ${subscribers.length + 1} recipients`);
  } catch (error) {
    console.error("Failed to send Telegram alert:", error);
  }
};
