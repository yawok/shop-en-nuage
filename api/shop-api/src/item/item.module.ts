import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity';
import { BasketModule } from '../basket/basket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    BasketModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule { }
