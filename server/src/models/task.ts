import { model, Schema } from "mongoose";
import {TaskInterface} from "./interfaces/task";

const TaskSchema = new Schema<TaskInterface> ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      }
})

export const Task = model<TaskInterface>('Task', TaskSchema);