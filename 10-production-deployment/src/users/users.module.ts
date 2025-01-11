import { Module, MiddlewareConsumer } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';

import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

import { User } from './user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
