import { MockModel } from '../../../database/support/mock.model';
import { User } from '../../schemas/user.schema';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected abstractStub: User = userStub();
}
