import { Response } from 'express';
import { responseStub } from '../test/stubs/response.stub';

export const response: Partial<Response> = {
  status: jest.fn().mockImplementation().mockReturnValue(200),
  json: jest.fn().mockImplementation().mockReturnValue(responseStub()),
  send: jest.fn().mockImplementation().mockReturnValue(''),
  cookie: jest.fn().mockImplementation().mockReturnValue('dassadasdadas'),
};
