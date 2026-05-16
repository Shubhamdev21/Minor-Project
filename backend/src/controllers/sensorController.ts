import { Request, Response } from 'express';
import SensorLog from '../models/SensorLog';

export const getSensors = async (req: Request, res: Response) => {
  try {
    // Return the latest status for each unique location
    const sensors = await SensorLog.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$location',
          status: { $first: '$status' },
          batteryLevel: { $first: '$batteryLevel' },
          temperature: { $first: '$temperature' },
          lastUpdate: { $first: '$createdAt' }
        }
      }
    ]);
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getSensorStatus = async (req: Request, res: Response) => {
  try {
    const logs = await SensorLog.find({}).sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
