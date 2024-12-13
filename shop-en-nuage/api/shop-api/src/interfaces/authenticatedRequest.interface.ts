import { Request } from "express";
import { UserResponseObject } from "./userResponse.interface";

export interface AuthenticatedReqeust extends Request {
	user: UserResponseObject;
}