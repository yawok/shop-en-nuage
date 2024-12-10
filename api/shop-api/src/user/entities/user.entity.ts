import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Basket } from "src/basket/entities/basket.entity";
import { addCreatedAt } from "src/helpers/createdAt.helper";

@Schema()
export class UserEntity {
	@Prop({type: String})
	username: string;

	@Prop({type: String})
	email: string;

	@Prop({type: String, select: false})
	password: string;

	@Prop({ type: Basket })
	basket: Basket;

	@Prop({type: String, select: false, default: new Date().toTimeString()})
	createdAt: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', hashPassword )
UserEntitySchema.pre<UserEntity>('save', (next: Function) => addCreatedAt(next, UserEntity))

async function hashPassword(next: Function) {
	this.password = await hash(this.password, 10);
	next();
}