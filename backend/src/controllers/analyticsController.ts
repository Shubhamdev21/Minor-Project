import { Request, Response } from 'express';
import Alert from '../models/Alert';

export const getHourlyAnalytics = async (req: Request, res: Response) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const alerts = await Alert.aggregate([
      { $match: { detectedAt: { $gte: twentyFourHoursAgo } } },
      {
        $group: {
          _id: { $hour: '$detectedAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getWeeklyAnalytics = async (req: Request, res: Response) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const alerts = await Alert.aggregate([
      { $match: { detectedAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dayOfWeek: '$detectedAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
