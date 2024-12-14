import { Types } from "mongoose";
import { Basket } from "src/basket/entities/basket.entity";

export interface IBasket extends Basket { 
	id?: Types.ObjectId
}