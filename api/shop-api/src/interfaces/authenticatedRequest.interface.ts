import { Request } from "express";
import { IUser } from "./user.interface";

export interface AuthenticatedReqeust extends Request {
	user: IUser;
}