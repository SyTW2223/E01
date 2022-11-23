import { model, Schema } from "mongoose";

import {UserInterface} from "./interfaces/user";
import { Session } from "./session";


const UserSchema = new Schema<UserInterface> ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    sessions: [
        {
            type: Session[],
            required: false,
            unique: false,
            trim: true,
        },
    ],
})

export const User = model<UserInterface>('User', UserSchema);