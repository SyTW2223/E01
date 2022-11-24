import { model, Schema } from "mongoose";
import { ObjectiveInterface } from "./interfaces/objective";


const ObjectiveSchema = new Schema<ObjectiveInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [{
      type: Schema.Types.ObjectId, ref: 'Task',
      trim: true
  }]
});

export const Objective = model<ObjectiveInterface>('Objective', ObjectiveSchema);