import { Request, Response } from 'express';
import Settings from '../models/Settings';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const telegramConfigured = Boolean(token && chatId);
    const telegramEnvIssues = telegramConfigured
      ? null
      : [
          !token ? 'Missing TELEGRAM_BOT_TOKEN' : null,
          !chatId ? 'Missing TELEGRAM_CHAT_ID' : null,
        ]
          .filter(Boolean)
          .join('; ');

    res.json({
      telegramEnabled: settings.telegramEnabled,
      buzzerEnabled: settings.buzzerEnabled,
      detectionSensitivity: settings.detectionSensitivity,
      simulationMode: settings.simulationMode,
      telegramConfigured,
      telegramEnvIssues,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    
    const { telegramEnabled, buzzerEnabled, detectionSensitivity, simulationMode } = req.body;
    
    settings.telegramEnabled = telegramEnabled ?? settings.telegramEnabled;
    settings.buzzerEnabled = buzzerEnabled ?? settings.buzzerEnabled;
    settings.detectionSensitivity = detectionSensitivity ?? settings.detectionSensitivity;
    settings.simulationMode = simulationMode ?? settings.simulationMode;
    
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
