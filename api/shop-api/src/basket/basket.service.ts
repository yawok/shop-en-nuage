import { Injectable } from '@nestjs/common';
import { Basket } from './entities/basket.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBasket } from 'src/interfaces/basket.interface';
import { UserResponseObject } from 'src/interfaces/userResponse.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private _basketModel: Model<Basket>,
    private _userService: UserService
  ) { }
  async create(): Promise<IBasket> {
    const b = new Basket();
    const basket = await this._basketModel.create(b);
    return basket;
  }

  async findOne(user: UserResponseObject): Promise<IBasket> {
    const fullUserObject = await this._userService.getUserByEmail(user.email);
    const basket = fullUserObject.basket;
    if (basket == null) {
      return
    }
    return basket;
  }
}
