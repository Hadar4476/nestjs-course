// Whats in this project?
// in this project an authentication system is implemented:
// - hashing user sensetive data for better security.
// - saving an identifier of a user on a session.
// - creating a decorator for receiving the current logged in user.
// - creating a guard to prevent unauthenticated users from reaching certain routes.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['vd0I1x3friSN'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
