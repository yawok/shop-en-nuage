import { Injectable } from '@nestjs/common';
import { Basket } from './entities/basket.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private _basketModel: Model<Basket>,
  ) { }
  async create(): Promise<any> {
    const basket = await this._basketModel.create({items: []});
    return basket;
  }

  async myBasket(user: IUser): Promise<any> {
    let basket = await user.basket.populate('items');
    console.log(basket.id)
    return basket;
  }
  
  async addItem(itemId: Types.ObjectId, basketId: Types.ObjectId): Promise<any> {
    let basket = await this._basketModel.findById(basketId);
    basket.items.push(itemId);
    basket = await basket.save();
    return basket;
  }
}
