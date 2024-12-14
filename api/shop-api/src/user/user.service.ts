import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponseObject } from 'src/interfaces/userResponse.interface';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserEntity.name) private _userModel: Model<UserEntity>, private _jwtService: JwtService) {}

	async createUser(userDto: CreateUserDto): Promise<UserResponseObject> {
		const existingUser = await this._userModel.findOne({ email: userDto.email});
		if (existingUser) {
			throw new UnprocessableEntityException('Email is already taken');
		}

		const newUser = await this._userModel.create(userDto);

		return this._buildUserResponse(newUser);
	}

	async login(userDto: LoginDto): Promise<UserResponseObject> {
		const user = await this._userModel.findOne({ email: userDto.email }).select('+password');
		if(!user) {
			throw new NotFoundException('User not found.');
		}

		const isCorrectPassword = await compare(userDto.password, user.password);
		if(!isCorrectPassword) {
			throw new NotFoundException('User not found.');
		}

		return this._buildUserResponse(user, true);
	}

	async getUserByEmail(email: string): Promise<UserResponseObject> {
		const user = await this._userModel.findOne({ email: email });
		return this._buildUserResponse(user);
	}

	private _buildUserResponse(user: UserEntity, isAuth: boolean = false): UserResponseObject {
		return {
			email: user.email,
			username: user.email,
			token: isAuth ? this._generateToken(user) : null,
		}
	}

	private _generateToken(user: UserEntity): string {
		const payload = {
			email: user.email
		}
		return this._jwtService.sign(payload);
	}
}
