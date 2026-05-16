import { io } from '../server';
import Alert from '../models/Alert';
import SensorLog from '../models/SensorLog';
import Settings from '../models/Settings';
import { sendTelegramAlert } from '../services/telegramService';

const LOCATIONS = ['Front Door', 'Back Door', 'Living Room', 'Garage', 'Balcony', 'Hallway'];

export const startPirSimulator = () => {
  setInterval(async () => {
    try {
      const settings = await Settings.findOne();
      if (settings && !settings.simulationMode) {
        return; // Skip if simulation is disabled
      }

      // Randomly trigger motion (e.g. 10% chance every 10 seconds)
      if (Math.random() < 0.1) {
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
        const severity = confidence > 90 ? 'HIGH' : confidence > 85 ? 'MEDIUM' : 'LOW';

        // 1. Create Alert
        const alert = await Alert.create({
          sensorId: `PIR_${location.replace(' ', '_').toUpperCase()}`,
          location,
          confidence,
          severity,
          detectedAt: new Date(),
        });

        // 2. Create Sensor Log
        await SensorLog.create({
          status: 'MOTION_DETECTED',
          location,
          batteryLevel: Math.floor(Math.random() * 20) + 80,
          temperature: Math.floor(Math.random() * 15) + 15,
        });

        // 3. Emit via WebSocket
        io.emit('motion_detected', {
          alertId: alert._id,
          location,
          confidence,
          severity,
          detectedAt: alert.detectedAt,
        });

        console.log(`[SIMULATOR] Motion detected at ${location} (Confidence: ${confidence}%, Severity: ${severity})`);
        
        if (severity === 'HIGH' || severity === 'MEDIUM') {
          await sendTelegramAlert(location, confidence, severity);
        }
      } else {
        // Just log idle status occasionally
        if (Math.random() < 0.05) {
          const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
          await SensorLog.create({
            status: 'IDLE',
            location,
            batteryLevel: Math.floor(Math.random() * 20) + 80,
            temperature: Math.floor(Math.random() * 15) + 15,
          });
        }
      }
    } catch (error) {
      console.error('Simulator Error:', error);
    }
  }, 10000); // Check every 10 seconds
};
