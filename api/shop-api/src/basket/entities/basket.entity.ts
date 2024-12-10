import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Basket {
	@Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }]})
	items: Types.ObjectId[]

	@Prop({ type: String})
	createdAt: string;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);

BasketSchema.pre<Basket>('save', addCreatedAt);

function addCreatedAt(next: Function) {
	this.createdAt = new Date().toTimeString();
	next();
}
