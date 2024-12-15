import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let userService: UserService;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = moduleRef.get<AuthGuard>(AuthGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
    userService = moduleRef.get<UserService>(UserService);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});