import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PostsModule } from '../src/posts/posts.module';
import { INestApplication } from '@nestjs/common';

describe('Posts', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PostsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  const NEW_POST = {
    title: 'Test title',
    user_id: 'test1test1test1test1test',
    technologies: [
      {
        tech_id: 1,
        version: '1.0.0',
      },
    ],
    category_id: 'test1test1test1test1test',
    url: 'https://www.foobar.com',
    banner_img: 'file://foobar.jpeg',
    sections: [
      {
        title: 'Test section title',
        content: 'Test section content',
      },
    ],
  };

  it(`/POST posts`, () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send(NEW_POST)
      .expect('Content-Type', /application\/json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(NEW_POST));
      });
  });

  it(`/GET posts`, () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then((response) => {
        const expected = [
          {
            _id: expect.any(String),
            __v: expect.any(Number),
            created_at: expect.any(String),
            title: expect.any(String),
            user_id: expect.any(String),
            technologies: [
              {
                tech_id: expect.any(Number),
                version: expect.any(String),
              },
            ],
            category_id: expect.any(String),
            url: expect.any(String),
            banner_img: expect.any(String),
            sections: [
              {
                title: expect.any(String),
                content: expect.any(String),
              },
            ],
          },
        ];
        expect(response.body).toEqual(expect.arrayContaining(expected));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
