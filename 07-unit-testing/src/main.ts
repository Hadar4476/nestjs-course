// How to run tests?
// run "npm run test:watch"
// press "p" for choosing the file by name.
// type the name of the file(e.g. auth.service.spec)

// How to improve the performance of tests?
// in package.json, change "test:watch": "jest --watch" to "test:watch": "jest --watch --maxWorkers=1"
// restart your test runner in terminal

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
