import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { BasketService } from '../basket/basket.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item } from './entities/item.entity';

describe('ItemService', () => {
  let service: ItemService;

  const mockBasketService = {
    create: jest.fn()
  };

  const mockItemModel = {
    findOne: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: BasketService, useValue: mockBasketService },
        { provide: getModelToken(Item.name), useValue: mockItemModel }
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
