import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UsersModule } from '../src/users/users.module';
import { INestApplication } from '@nestjs/common';

describe('Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  const NEW_USER = {
    mail: 'test@mail.com',
    pass: 'testpassword',
    name: 'Test user',
  };

  it(`/POST users`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(NEW_USER)
      .expect('Content-Type', /application\/json/)
      .expect(201)
      .then((response) => {
        const expected = {
          mail: NEW_USER.mail,
          name: NEW_USER.name,
        };
        expect(response.body).toEqual(expect.objectContaining(expected));
      });
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then((response) => {
        const expected = [
          {
            _id: expect.any(String),
            __v: expect.any(Number),
            created_at: expect.any(String),
            mail: expect.any(String),
            name: expect.any(String),
          },
        ];
        expect(response.body).toEqual(expect.arrayContaining(expected));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
