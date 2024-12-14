import { Types } from "mongoose";
import { IBasket } from "./basket.interface";

export interface IUser { 
	id?: Types.ObjectId;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	basket: IBasket;
}