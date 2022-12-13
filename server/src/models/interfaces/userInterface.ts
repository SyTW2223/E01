import {SessionInterface} from "./sessionInterface";

export interface UserInterface {
    name: string;
    password: string;
    sessions: SessionInterface[];
    token: String;
}