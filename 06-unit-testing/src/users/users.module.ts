import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { AuthService } from './auth.srvice';

import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

import { User } from './user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // CONTROLLER SCOPED INTERCEPTOR - for single controller
    // CurrentUserInterceptor

    // GLOBAL SCOPED INTERCEPTOR - for multiple controllers
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
