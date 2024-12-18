// NESTJS
// in NestJS we use tools/decorators to build our server
// NestJS provides multiple tools like:
// - Pipe - used for validating incoming data.
// - Guard - used for guarding routes if is not authenticated.
// - Controller - handles the incoming requests and attaches the route to a function.
// - Service - used for running some buisness logic.
// - Repository - used for accessing the database.

import { NestFactory } from "@nestjs/core";

// every NestJS app have at lease one Controller and one Module!
import { AppModule } from "./app.module";

// a function that runs everytime the application starts.
// it is a conviction to call it bootstrap.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();

// HOW TO RUN
// open terminal and paste "npx ts-node-dev src/main.ts"
