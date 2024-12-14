import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Basket, BasketSchema } from './entities/basket.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Basket.name, schema: BasketSchema }]
    ), 
    UserModule,
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule { }