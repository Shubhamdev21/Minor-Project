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

      // Trigger motion every time (100% chance)
      if (true) {
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

        console.log(`[SIMULATOR] Scheduled Alert triggered at ${location} (Every 30s)`);
        
        if (severity === 'HIGH' || severity === 'MEDIUM') {
          await sendTelegramAlert(location, confidence, severity);
        }
      }
    } catch (error) {
      console.error('Simulator Error:', error);
    }
  }, 30000); // Trigger exactly every 30 seconds
};
/* 
 Every 30s
    ↓
 Is simulation ON?  →  NO → Do nothing
    ↓ YES
 Pick random location (e.g. "Garage")
    ↓
 Generate confidence score (e.g. 94%)
    ↓
 Severity = HIGH
    ↓
 Save Alert to DB
 Save Sensor Log to DB📡 Send live update to website (WebSocket)
 Send Telegram message
*/