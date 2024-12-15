import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Item } from "../../item/entities/item.entity";

@Schema({ timestamps: true, id: true })
export class Basket {
	@Prop({ type: [{ type: Types.ObjectId, ref: Item.name }] })
	items: Types.ObjectId[]
}

export const BasketSchema = SchemaFactory.createForClass(Basket);