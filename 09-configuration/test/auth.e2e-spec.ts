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

  it('login as a new user then get the currently logged in user', async () => {
    const email = 'test1@test.com';

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: '123456' })
      .expect(201);

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
