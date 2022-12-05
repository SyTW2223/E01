import {SessionInterface} from "./session";

export interface UserInterface {
    name: string;
    password: string;
    sessions: SessionInterface[];
    token: String;
}