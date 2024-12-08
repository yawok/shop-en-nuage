import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Item {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String })
	description: string;

	@Prop({ type: String, required: true })
	price: number;

	@Prop({ type: String })
	createdAt: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.pre<Item>('save', addCreatedDate)

function addCreatedDate(next: Function) {
	this.createdAt = new Date().toUTCString();
	next();
}