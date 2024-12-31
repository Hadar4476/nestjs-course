import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// a decorator alone can't be injectable
// this is why interceptor is needed(see current-user.interceptor.ts to understand more)
// eventually the request will hold the currrentUser which is returned in the CurrentUser decorator.

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // this will hold the request
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
