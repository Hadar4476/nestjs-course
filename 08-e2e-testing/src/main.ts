// How to run E2E tests?
// run "npm run test:e2e"

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Why is the cookie session middleware and the validation pipe are removed from here?
// so it can be used at the module level and not on the main level.
// executing E2E tests requires a behavior of sending and receiving requests and responses.
// every instance of the app will include these features by moving them to the module level.
// see app.module.ts and auth.ese-spec.ts files

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
