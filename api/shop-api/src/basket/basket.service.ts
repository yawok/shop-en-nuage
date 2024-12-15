import { Injectable } from '@nestjs/common';
import { Basket } from './entities/basket.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBasket } from 'src/interfaces/basket.interface';
import { UserResponseObject } from 'src/interfaces/userResponse.interface';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private _basketModel: Model<Basket>,
  ) { }
  async create(): Promise<IBasket> {
    const b = new Basket();
    const basket = await this._basketModel.create({items: []});
    return basket.toObject();
  }

  async myBasket(user: IUser): Promise<any> {
    let basket = user.basket;
    console.log(user.basket)
    console.log(basket._id);
    const bbasket = await (await this._basketModel.findById(basket._id)).populate("items");
    return bbasket.items;
  }
  
  async addItem(itemId: Types.ObjectId, basketId: Types.ObjectId): Promise<IBasket> {
    let basket = await this._basketModel.findById(basketId);
    basket.items.push(itemId);
    basket = await basket.save();
    return basket;
  }
}
