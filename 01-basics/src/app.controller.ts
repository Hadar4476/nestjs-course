import { Controller, Get } from "@nestjs/common";

// you can set a main route for this controller like "/app", so now the route is "localhost:3000/app"
@Controller("/app")
export class AppController {
  // a decorator for GET requests
  // you can set a route inside a get like "/test", so now the route is "localhost:3000/app/test"
  @Get("/test")
  getRooutRoute() {
    return "Hi There!";
  }

  @Get("/bye")
  getByThere() {
    return "Bye There!";
  }
}
