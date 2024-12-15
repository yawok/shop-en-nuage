import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateItemDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsNumber()
	@IsNotEmpty()
	price: number;
}
