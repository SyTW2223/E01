import { model, Schema } from "mongoose";
import {TaskInterface} from "./interfaces/task";

const TaskSchema = new Schema<TaskInterface> ({
    name: {
      type: String,
      required: true,
      trim: true,
    }, 
    objetive: {
      type: Schema.Types.ObjectId, ref: 'Objective',
      trim: true
    }
})

export const Task = model<TaskInterface>('Task', TaskSchema);