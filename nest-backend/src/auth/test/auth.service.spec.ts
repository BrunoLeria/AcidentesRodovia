import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { userStub } from '../../users/test/stubs/user.stub';
import { response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/schemas/user.schema';

jest.mock('@nestjs/config');
jest.mock('@nestjs/jwt');
jest.mock('../../users/users.service');
jest.mock('express');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, AuthService, ConfigService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    describe('when login is called', () => {
      beforeEach(async () => {
        await service.login(userStub(), response);
      });

      test('response should call cookie', () => {
        expect(response.cookie).toBeCalled();
      });

      test('response cookie should return a string', () => {
        expect(response.cookie).toHaveReturnedWith(expect.any(String));
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      beforeEach(() => {
        service.logout(response);
      });

      test('response should call cookie', () => {
        expect(response.cookie).toBeCalled();
      });

      test('response cookie should return a string', () => {
        expect(response.cookie).toHaveReturnedWith(expect.any(String));
      });
    });
  });

  describe('validatePassword', () => {
    describe('when validatePassword is called', () => {
      let compareSpy: jest.SpyInstance;

      beforeEach(async () => {
        compareSpy = jest.spyOn(bcrypt, 'compare');
        await service.validatePassword('password', userStub().password);
      });

      test('should call compare', () => {
        expect(compareSpy).toBeCalled();
      });
    });
  });

  describe('validateUser', () => {
    describe('when validateUser is called', () => {
      let validateUserSpy: jest.SpyInstance;
      let user: User;

      beforeEach(async () => {
        validateUserSpy = jest.spyOn(service, 'validateUser');
        user = await service.validateUser(userStub().email, 'password');
      });

      test('should call validateUser', () => {
        expect(validateUserSpy).toBeCalled();
      });

      test('should return a user', () => {
        expect(user).toEqual(
          expect.objectContaining({
            _id: userStub()._id,
            userId: userStub().userId,
            email: userStub().email,
            name: userStub().name,
          }),
        );
      });
    });
  });
});
