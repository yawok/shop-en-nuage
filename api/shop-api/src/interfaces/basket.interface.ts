import { Document, Types } from "mongoose";
import { IItem } from "./item.interface";

export interface IBasket extends Document { 
	_id: Types.ObjectId,
	items: IItem[],
	createdAt: Date,
	updatedAt: Date,
	__v: number
}