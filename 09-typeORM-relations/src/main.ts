// Whats in this project?

// - Relations with TypeORM:
//   TypeORM uses decorators to create a relation between entities.
//   see "user.entity" and "report.entity" for more.

// - Permissions as guards:
//   created a new guard called AdminGuard which prevent regular users from
//   updating the approval of reports.

// - Middleware for current user:
//   because an interceptor only initialized inside the request itself, not before it
//   there is no way to know if the current user is an admin.
//   this is why the CurrentUserMiddleware is created(see "users.module" for more info).

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
