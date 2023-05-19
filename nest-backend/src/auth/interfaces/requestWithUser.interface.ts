import { Request } from 'express';
import { UserType } from '../../users/schemas/user.schema';

interface RequestWithUser extends Request {
  user: UserType;
}

export default RequestWithUser;
