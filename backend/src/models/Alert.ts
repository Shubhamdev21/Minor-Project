import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  sensorId: string;
  location: string;
  confidence: number;
  detectedAt: Date;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  imageSnapshot?: string;
  isResolved: boolean;
  notificationSent: boolean;
}

const AlertSchema: Schema = new Schema({
  sensorId: { type: String, required: true },
  location: { type: String, required: true },
  confidence: { type: Number, required: true, min: 0, max: 100 },
  detectedAt: { type: Date, default: Date.now },
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], required: true },
  imageSnapshot: { type: String },
  isResolved: { type: Boolean, default: false },
  notificationSent: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IAlert>('Alert', AlertSchema);
