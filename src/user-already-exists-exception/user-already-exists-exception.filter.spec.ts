import { UserAlreadyExistsExceptionFilter } from './user-already-exists-exception.filter';

describe('UserAlreadyExistsExceptionFilter', () => {
  it('should be defined', () => {
    expect(new UserAlreadyExistsExceptionFilter()).toBeDefined();
  });
});
