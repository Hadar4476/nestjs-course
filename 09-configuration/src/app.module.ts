import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';

const cookieSession = require('cookie-session');

const connection = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'sqlite',
      database: config.get<string>('DB_NAME'),
      synchronize: true,
      entities: [User, Report],
    };
  },
});

@Module({
  imports: [
    // adding config module for configuration
    ConfigModule.forRoot({
      isGlobal: true,
      // NODE_ENV enviroment variable will be set in package.json scripts by typing "cross-env NODE_ENV=SOME_ENVIROMENT"
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    connection,
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['vd0I1x3friSN'],
        }),
      )
      .forRoutes('*');
  }
}
