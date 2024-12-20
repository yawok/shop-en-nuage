import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseObject } from '../interfaces/userResponse.interface';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces/user.interface';
import { BasketService } from '../basket/basket.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity.name) private _userModel: Model<UserEntity>, 
		private _jwtService: JwtService,
		private _basketService: BasketService
	) { }

	async createUser(userDto: CreateUserDto): Promise<UserResponseObject> {
		const existingUser = await this._userModel.findOne({ email: userDto.email });
		if (existingUser) {
			throw new UnprocessableEntityException('Email is already taken');
		}

		const newUser = await this._userModel.create(userDto);
		newUser.basket = (await this._basketService.create())._id;
		newUser.save();

		return this._buildUserResponse(newUser);
	}

	async login(userDto: LoginDto): Promise<UserResponseObject> {
		const user = await this._userModel.findOne({ email: userDto.email }).select('+password');
		if (!user) {
			throw new NotFoundException('User not found.');
		}

		const isCorrectPassword = await compare(userDto.password, user.password);
		if (!isCorrectPassword) {
			throw new NotFoundException('User not found.');
		}

		return this._buildUserResponse(user, true);
	}

	async getUserByEmail(email: string): Promise<IUser> {
		let user: IUser = await (await this._userModel.findOne({ email: email })).populate('basket');
		return user;
	}

	private _buildUserResponse(user: UserEntity, isAuth: boolean = false): UserResponseObject {
		const responseObject: UserResponseObject = {
			email: user.email,
			username: user.username,
		}

		if (isAuth) {
			responseObject.token = this._generateToken(user)
		}

		return responseObject;
	}

	private _generateToken(user: UserEntity): string {
		const payload = {
			email: user.email
		}
		return this._jwtService.sign(payload);
	}
}
