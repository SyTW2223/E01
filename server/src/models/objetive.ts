import { model, Schema } from "mongoose";
import { ObjetiveInterface } from "./interfaces/objetive";


const ObjetiveSchema = new Schema<ObjetiveInterface>({
  name: {
    type: String,
    trim: true
  },
  tasks: [
    {
      type: String,
      trim: true
    }
  ]
});

export const Objetive = model<ObjetiveInterface>('Objetive', ObjetiveSchema);