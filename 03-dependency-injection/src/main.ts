// DEPENDENCY INJECTION(DI)

// Introduction
// NestJS uses DI between the controller, service and repository layers to ensure
// the modularity, testability and maintainability of the application.

// Inversion of Control(IoC) Principle
// an idea in software engineering that means that following this priniciple will may result in easier way
// for building reusable code.
// one example for this idea is that a class should not create instances of its dependencies on its own.
// see messags.controller.ts OR messages.service.ts - WITHOUT IoC and uncomment the code to understand more.

// Inversion of Control - Downsides
// using IoC alone without DI can be overwhelming because it can lead to multiple lines of code for just using one controller.
// How?
// lets say a controller can have multiple services, each services should have its own repository so the usage will look like this:

// const repo1 = new RepoOne();
// const service1 = new ServiceOne();
// const repo2 = new RepoTwo();
// const service2 = new ServiceTwo();
// const controller = new Controller(service1, service2);

// you see the problem there? multiple lines of code need to be executed for just one controller.
// this is just a small case, what about a service that uses multiple repos? it is alot of code for just one controller usage.
// this is why DI comes to play.

// How does DI works?
// it uses a container which list all classes that should be injected and their dependencies.
// after looking at them, it lists all instances which have been created.
// then it looks at the service and creates an initialized copy of the controller with all the dependencies wired to it.

// listing a class to the container is done by adding a special decorator: @Injectable
// see messages.service.ts or messages.repository.ts to understand more.

// finally adding this list of dependencies to a module is done by listing them under "providers".
// see messages.module.ts or messages.repository.ts to understand more.

import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
