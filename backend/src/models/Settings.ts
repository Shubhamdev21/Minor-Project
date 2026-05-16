import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  telegramEnabled: boolean;
  buzzerEnabled: boolean;
  detectionSensitivity: number;
  simulationMode: boolean;
}

const SettingsSchema: Schema = new Schema({
  telegramEnabled: { type: Boolean, default: true },
  buzzerEnabled: { type: Boolean, default: true },
  detectionSensitivity: { type: Number, default: 80 },
  simulationMode: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ISettings>('Settings', SettingsSchema);
