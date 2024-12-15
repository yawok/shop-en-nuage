import { Test, TestingModule } from '@nestjs/testing';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

describe('BasketController', () => {
  let controller: BasketController;

  const mockBasketService = {
    getBasket: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketController],
      providers: [{ provide: BasketService, useValue: mockBasketService }],
    }).compile();

    controller = module.get<BasketController>(BasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
