import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  chatId: string;
  name?: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  chatId: { type: String, required: true, unique: true },
  name: { type: String },
}, { timestamps: true });

export default mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
