import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity, UserEntitySchema } from './user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
    JwtModule,
  ],
  providers: [UserService, AuthGuard],
  exports: [UserService, AuthGuard],
})
export class UserModule {}
