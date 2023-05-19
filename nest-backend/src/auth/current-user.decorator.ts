import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserType } from '../users/schemas/user.schema';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): UserType => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
