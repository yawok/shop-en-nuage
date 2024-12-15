import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { BasketModule } from './basket/basket.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig
    }),
    UserModule,
    ItemModule,
    BasketModule
    JwtModule.registerAsync({ useClass: JwtConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
