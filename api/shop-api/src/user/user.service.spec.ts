import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { BasketService } from '../basket/basket.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserEntity } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  const mockJwtService = {
    sign: jest.fn()
  };

  const mockBasketService = {
    create: jest.fn()
  };

  const mockUserModel = {
    findOne: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: BasketService, useValue: mockBasketService },
        { provide: getModelToken(UserEntity.name), useValue: mockUserModel}
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
