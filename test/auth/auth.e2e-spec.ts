import { User } from './../../src/users/entities/user.entity';
import { mockedUser } from './../mocks';
import { AppModule } from './../../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';

describe('/login', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();

    repository = moduleFixture.get('UserRepository');
    const connection = repository.manager.connection;

    await connection.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /login - Must be able to login', async () => {
    await request(app.getHttpServer()).post('/users').send(mockedUser);
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('POST /login -  Should not be able to login with an incorrect username', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ username: 'WrongUserName', password: mockedUser.password });
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Wrong username or password.');
    expect(response.status).toBe(403);
  });

  it('POST /login -  Should not be able to login with an incorrect password', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ username: mockedUser.username, password: 'Wrong Password' });
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Wrong username or password.');
    expect(response.status).toBe(403);
  });
});
