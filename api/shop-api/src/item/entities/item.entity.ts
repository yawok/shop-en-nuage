import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Item {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String })
	description: string;

	@Prop({ type: String, required: true })
	price: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);