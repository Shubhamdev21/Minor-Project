import { Request, Response } from 'express';
import Settings from '../models/Settings';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
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
