import { Test, TestingModule } from '@nestjs/testing';
import { BasketService } from './basket.service';
import { getModelToken } from '@nestjs/mongoose';
import { Basket } from './entities/basket.entity';

describe('BasketService', () => {
  let service: BasketService;

  const mockBasketModel = {
    create: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        { provide: getModelToken(Basket.name), useValue: mockBasketModel }
      ],
    }).compile();

    service = module.get<BasketService>(BasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
