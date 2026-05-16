import { Request, Response } from 'express';
import Alert from '../models/Alert';

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find({}).sort({ detectedAt: -1 }).limit(50);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { sensorId, location, confidence, severity } = req.body;
    const alert = await Alert.create({
      sensorId,
      location,
      confidence,
      severity,
    });
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const resolveAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    alert.isResolved = true;
    await alert.save();
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.json({ message: 'Alert removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
