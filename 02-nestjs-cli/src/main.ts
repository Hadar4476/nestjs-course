// NESTJS CLI
// in this lecture there are explanations about how to work with the NestJS CLI

// HOW TO START A NEW PROJECT?
// run "nest add <SOME_PROJECt_NAME>"

// HOW TU RUN?
// run "npm run start:dev"

// HOW TO CREATE A MODULE?
// run "nest generate module <SOME_MODULE_NAME>"

// HOW TO CREATE A CONTROLLER?
// run "nest generate controller <SOME_EXISTING_MODULE>/<SOME_EXISTING_MODULE> --flat"
// the first "SOME_EXISTING_MODULE" is the directory like "messages".
// the second "SOME_EXISTING_MODULE" is telling that module to call the controller.
// --flat is telling the CLI not to create a new directory.

import { NestFactory } from '@nestjs/core';

import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
