import { userStub } from '../../users/test/stubs/user.stub';
export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(userStub()),
  logout: jest.fn().mockResolvedValue(''),
  validateUser: jest.fn().mockResolvedValue(userStub()),
});
