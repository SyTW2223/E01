import { model, Schema } from "mongoose";
import {TaskInterface} from "./interfaces/taskInterface";

const TaskSchema = new Schema<TaskInterface> ({
    name: {
      type: String,
      required: true,
      trim: true,
    }, 
    objective: {
      type: Schema.Types.ObjectId, ref: 'Objective',
      trim: true
    }
})

export const Task = model<TaskInterface>('Task', TaskSchema);