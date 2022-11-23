import { model, Schema } from "mongoose";

import {UserInterface} from "./interfaces/user";



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
            type: Schema.Types.ObjectId, ref: 'Session',
            required: false,
            unique: false,
            trim: true,
        },
    ],
})

export const User = model<UserInterface>('User', UserSchema);