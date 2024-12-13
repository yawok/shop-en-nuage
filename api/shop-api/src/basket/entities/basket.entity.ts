import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Basket {
	@Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
	items: Types.ObjectId[]
}

export const BasketSchema = SchemaFactory.createForClass(Basket);

BasketSchema.pre<Basket>('save', addCreatedAt);

function addCreatedAt(next: Function) {
	this.createdAt = new Date().toTimeString();
	next();
}
