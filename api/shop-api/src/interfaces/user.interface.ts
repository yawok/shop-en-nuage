import { Types } from "mongoose";
import { IBasket } from "./basket.interface";

export interface IUser { 
	_id: Types.ObjectId;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	basket: IBasket;
	__v: number
}