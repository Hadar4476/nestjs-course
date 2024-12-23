import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  // will generate an automatic value for this field
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // BEFORE CREATING CUSTOM INTERCEPTOR
  // by applying this decorator the password won't get sent to the client.
  // it works whenever the entity object is converted to a json(sending that object back as response).
  // @Exclude()
  password: string;

  // These hooks won't execute if you don't create an entity(see user.service.ts for more info).
  // the name of the function is customizable("logInsert", "logUpdate" and  "logRemove").
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id: ${this.id}`);
  }
}
