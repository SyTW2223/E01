import {SessionInterface} from "./interfaces/session";

export interface UserInterface {
    name: string;
    password: string;
    sessions: SessionInterface[];
}

