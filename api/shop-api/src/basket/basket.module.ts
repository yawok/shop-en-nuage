import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Basket, BasketSchema } from './entities/basket.entity';
import { Item, ItemSchema } from '../item/entities/item.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Basket.name, schema: BasketSchema },
        { name: Item.name, schema: ItemSchema }
      ]
    ), 
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService]
})
export class BasketModule { }
