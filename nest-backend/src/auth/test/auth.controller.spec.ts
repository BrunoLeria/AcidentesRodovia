import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { userStub } from '../../users/test/stubs/user.stub';
import { response } from 'express';

jest.mock('../auth.service');
jest.mock('express');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    describe('when login is called', () => {
      beforeEach(async () => {
        await controller.login(userStub(), response);
      });

      test('then it should call authService', () => {
        expect(service.login).toBeCalledWith(userStub(), response);
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      beforeEach(async () => {
        await controller.logout(response);
      });

      test('then it should call authService', () => {
        expect(service.logout).toBeCalledWith(response);
      });
    });
  });
});
