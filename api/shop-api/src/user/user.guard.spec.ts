import { UserGuard } from './guards/auth.guard';

describe('UserGuard', () => {
  it('should be defined', () => {
    expect(new UserGuard()).toBeDefined();
  });
});
