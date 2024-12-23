// What in this project?
// - TypeORM - for connection to a SQL database(not manually creating a repository file).
// -Serialize - for setting rules which expose only specific properties of an entity as response.
// - Custom Decorator - for shortening code and making it more readable.

// How to initialize TypeORM?
// run "npm i @nestjs/typeorm typeorm sqlite3"

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // cleans up any additional properties from the request which are not listed in the DTO.
      // this is good for security, making sure only the data that should be received is been used.
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
