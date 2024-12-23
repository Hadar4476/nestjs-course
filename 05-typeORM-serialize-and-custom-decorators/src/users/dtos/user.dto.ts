import { Expose } from 'class-transformer';

// this is the entity which is going to eventually get "exposed the world".
// creating a set of rules by using the @Expose decorator which is saying "only expose these properties".
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
