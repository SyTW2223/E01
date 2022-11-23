import { model, Schema } from "mongoose";
import { SessionInterface } from "./interfaces/session";
import { Objetive } from "./objetive";
import { User } from "./user";

const SessionSchema = new Schema<SessionInterface>({
  id: {
    type: String,
    trim: true
  },
  user: {
    type: User,
    trim: true
  },
  time: {
    type: Date,
    trim: true
  },
  objetives: [{
    type: Objetive,
    trim: true
  }]
});

export const Session = model<SessionInterface>('Session', SessionSchema);