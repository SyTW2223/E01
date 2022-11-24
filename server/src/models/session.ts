import { model, Schema } from "mongoose";
import { SessionInterface } from "./interfaces/session";

const SessionSchema = new Schema<SessionInterface>({
  id: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
    trim: true
  },
  time: {
    type: Date,
    required: true,
    trim: true
  },
  objectives: [{
    type: Schema.Types.ObjectId, ref: 'Objective',
    trim: true
  }]
});

export const Session = model<SessionInterface>('Session', SessionSchema);