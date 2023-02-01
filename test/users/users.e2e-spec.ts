import { User } from './../../src/users/entities/user.entity';
import { mockedUser } from './../mocks';
import { AppModule } from './../../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';

describe('/users', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    repository = moduleFixture.get('UserRepository');
    const connection = repository.manager.connection;

    await connection.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users -  Must be able to create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(mockedUser);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.username).toEqual('Guilherme');
    expect(response.body).not.toHaveProperty('password');
  });

  it('POST /users -  Must not be able to create a user with an username that already has taken', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(mockedUser);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Username already exists.');
    expect(response.status).toBe(400);
  });

  it('GET /users -  Must be able to list users if authenticate', async () => {
    const resLogin = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .get('/users')
      .auth(resLogin.body.token, { type: 'bearer' });

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('username');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.status).toBe(200);
  });

  it('GET /users -  Shoud not be able to list users if is not authenticate', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.body.message).toEqual('Unauthorized');
    expect(response.status).toBe(401);
  });
});
