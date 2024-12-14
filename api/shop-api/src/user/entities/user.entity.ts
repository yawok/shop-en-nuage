import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Basket } from "src/basket/entities/basket.entity";
import { IBasket } from "src/interfaces/basket.interface";

@Schema({ timestamps: true, id: true })
export class UserEntity {
	@Prop({ type: String })
	username: string;

	@Prop({ type: String })
	email: string;

	@Prop({ type: String, select: false })
	password: string;

	@Prop({ type: Basket })
	basket: IBasket;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', hashPassword)

async function hashPassword(next: Function) {
	this.password = await hash(this.password, 10);
	next();
}