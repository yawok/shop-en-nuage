import { Controller, Get, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AuthenticatedReqeust } from '../interfaces/authenticatedRequest.interface';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}
  @Get()
  findOne(@Req() request: AuthenticatedReqeust) {
    const user = request.user;
    return this.basketService.myBasket(user);
  }
}
