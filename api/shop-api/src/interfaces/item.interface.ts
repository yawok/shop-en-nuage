import { Types } from "mongoose";
import { Item } from "../item/entities/item.entity";

export interface IItem extends Item { 
	_id: Types.ObjectId
}