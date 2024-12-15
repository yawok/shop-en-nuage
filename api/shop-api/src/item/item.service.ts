import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './entities/item.entity';
import { Model } from 'mongoose';
import { IItem } from '../interfaces/item.interface';
import { BasketService } from '../basket/basket.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private _itemModel: Model<Item>,
    private _basketService: BasketService
  ) { }

  async create(createItemDto: CreateItemDto): Promise<IItem> {
    const newItem = await this._itemModel.create(createItemDto);
    return newItem;
  }

  async findAll(): Promise<Array<IItem>> {
    const items: Array<IItem> = await this._itemModel.find();
    return items;
  }

  async findOne(id: string): Promise<IItem> {
    const item: IItem = await this._itemModel.findOne({_id: id});
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<IItem> {
    await this._itemModel.findOneAndUpdate({_id: id}, updateItemDto);
    const item = await this._itemModel.findOne({_id: id});
    return item;
  }

  remove(id: string): void {
    this._itemModel.findByIdAndDelete({_id: id});
  }

  async addToBasket(id: string, user: IUser): Promise<any> {
    const item = await this.findOne(id);
    const basketId = user.basket._id;
    return this._basketService.addItem(item._id, basketId);
  }
}
