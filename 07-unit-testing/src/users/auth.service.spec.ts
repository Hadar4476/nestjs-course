// How to run this test?
// run "npm run test:watch"
// press "p" for choosing the file by name.
// type the name of the file(e.g. auth.service.spec)

// How to improve the performance of tests?
// in package.json, change "test:watch": "jest --watch" to "test:watch": "jest --watch --maxWorkers=1"
// restart your test runner in terminal

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  // this will run before each tests and will initialize the service.
  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);

        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const id = Math.floor(Math.random() * 999999);

        const user = {
          id,
          email,
          password,
        } as User;

        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a slated and hashed password', async () => {
    const user = await service.register('test@test.com', '123456');

    expect(user.password).not.toEqual('123456');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user register with email that is in use', async () => {
    await service.register('test@test.com', '123456');

    await expect(service.register('test@test.com', '123456')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if login is called with an unused email', async () => {
    await expect(service.login('some_user@test.com', '123456')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.register('some_test@test.com', '123456');

    await expect(
      service.login('some_test@test.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.register('test@test.com', '123456');

    const user = await service.login('test@test.com', '123456');

    expect(user).toBeDefined();
  });
});
