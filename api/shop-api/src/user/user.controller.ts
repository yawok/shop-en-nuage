import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UserResponseObject } from 'src/interfaces/userResponse.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseObject> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseObject> {
    return this.userService.login(loginDto);
  }

  @Get('profile')
  async profile() {
    return null
  }
}
