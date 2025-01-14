import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // creates an instance of the whole app
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const incomingEmail = 'test1@test.com';

    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: incomingEmail, password: '123456' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;

        expect(id).toBeDefined();
        expect(email).toEqual(incomingEmail);
      });
  });
});
