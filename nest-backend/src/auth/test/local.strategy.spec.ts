import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { userStub } from '../../users/test/stubs/user.stub';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(userStub());
      expect(await localStrategy.validate('test', 'test')).toEqual(userStub());
    });
  });
});
