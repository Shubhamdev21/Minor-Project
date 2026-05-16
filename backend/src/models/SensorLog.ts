import mongoose, { Schema, Document } from 'mongoose';

export interface ISensorLog extends Document {
  status: 'ONLINE' | 'OFFLINE' | 'MOTION_DETECTED' | 'IDLE';
  location: string;
  batteryLevel: number;
  temperature: number;
  createdAt: Date;
}

const SensorLogSchema: Schema = new Schema({
  status: { type: String, enum: ['ONLINE', 'OFFLINE', 'MOTION_DETECTED', 'IDLE'], required: true },
  location: { type: String, required: true },
  batteryLevel: { type: Number, required: true, min: 0, max: 100 },
  temperature: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ISensorLog>('SensorLog', SensorLogSchema);
