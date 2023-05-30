import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { userStub } from '../../users/test/stubs/user.stub';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token and user object', async () => {
      const user = userStub();
      const token = 'testtoken';
      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const response: Response = {
        send: jest.fn(),
      } as any;

      await controller.login(user, response);

      expect(response.send).toHaveBeenCalledWith({ token, ...user });
    });
  });

  describe('logout', () => {
    it('should call authService.logout', async () => {
      const response: Response = {} as any;
      jest.spyOn(authService, 'logout').mockResolvedValue(undefined);

      await controller.logout(response);

      expect(authService.logout).toHaveBeenCalledWith(response);
    });
  });
});
