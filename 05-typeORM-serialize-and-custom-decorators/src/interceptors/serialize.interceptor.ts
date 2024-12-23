// Serialize Interceptor - Custom Interceptor
// Why use this interceptor?
// because it gives more control over the data that should be sent as response.
// instead of just using decorators like @Exclude with @UseInterceptors(ClassSerializerInterceptor)
// it allows running a handler(next) which can run on a request to apply changes to the response before its sent.

import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { map, Observable } from 'rxjs';

// custom decorator for shortening the usage of @UseInterceptors(new SerializeInterceptor(UserDto)).
// making sure that only class type can be passed to @Serialize with ClassConstructor<T>.
export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<T> {
    // Run something before a request is handled by request handler(next).
    console.log("I'm running before the handler", context);

    return next.handle().pipe(
      map((data: T) => {
        // // Run something before the response is sent out.
        // console.log("I'm running before response is sent out", data);

        return plainToInstance(this.dto, data, {
          // this flag is important for exposing only marked properties with the @Expose decorator.
          // see user.dto.ts to understand more.
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
