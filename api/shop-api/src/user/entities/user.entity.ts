import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";

@Schema()
export class UserEntity {
	@Prop({type: String})
	username: string;

	@Prop({type: String})
	email: string;

	@Prop({type: String})
	password: string;

	@Prop({type: String, select: false})
	createdAt: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', hashPassword )

async function hashPassword(next: Function) {
	this.password = await hash(this.password, 10);
	next();
}