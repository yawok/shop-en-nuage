import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
    JwtModule.registerAsync({ useClass: JwtConfig }),
  ],
  controllers: [UserController],
  providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class UserModule { }
