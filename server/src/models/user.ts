import { model, Schema } from "mongoose";

import {UserInterface} from "./interfaces/user";
import {SessionInterface} from "./interfaces/session";


export const UserSchema = new Schema<UserInterface> ({
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
            type: SessionInterface[],
            required: false,
            unique: false,
            trim: true,
        },
    ],
})

export const User = model<UserInterface>('User', UserSchema);