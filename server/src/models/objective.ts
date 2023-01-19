import { model, Schema } from "mongoose";
import { ObjectiveInterface } from "./interfaces/objectiveInterface";


const ObjectiveSchema = new Schema<ObjectiveInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  session: {
    type: Schema.Types.ObjectId, ref: 'Session',
    required: true,
    trim: true
  },
  tasks: [{
    type: Schema.Types.ObjectId, ref: 'Task',
    trim: true
  }]
});

export const Objective = model<ObjectiveInterface>('Objective', ObjectiveSchema);