import { User } from './../../src/users/entities/user.entity';
import {
  mockedEditEvent,
  mockedEvent,
  mockedEventWithWrongDate,
  mockedUser,
  mockedUserTwo,
} from './../mocks';
import { AppModule } from './../../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { resolve } from 'path';

describe('/events', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    repository = moduleFixture.get('UserRepository');
    repository = moduleFixture.get('EventRepository');
    repository = moduleFixture.get('EventImageRepository');
    repository = moduleFixture.get('EventAddressRepository');
    const connection = repository.manager.connection;

    await connection.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /events - Should be able to create an event', async () => {
    await request(app.getHttpServer()).post('/users').send(mockedUser);
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .post('/events')
      .auth(resToken.body.token, { type: 'bearer' })
      .send(mockedEvent);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('address');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('eventAddressId');
    expect(response.body).toHaveProperty('eventDate');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('phone');
    expect(response.body).toHaveProperty('responsible');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('userId');
  });

  it('POST /events - Should not be able to create an event at the same place at the same date', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .post('/events')
      .auth(resToken.body.token, { type: 'bearer' })
      .send(mockedEvent);

    expect(response.status).toBe(409);
    expect(response.body.message).toEqual(
      'There is already an event scheduled at this location on this date.',
    );
  });

  it('POST /events - Should not be able to create an event in a past date.', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .post('/events')
      .auth(resToken.body.token, { type: 'bearer' })
      .send(mockedEventWithWrongDate);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('POST /events - Should not be able to create an event if not authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/events')
      .send(mockedEvent);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('GET /events - Should be able to list all events if is authenticate', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .get('/events')
      .auth(resToken.body.token, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('userId');
    expect(response.body[0]).toHaveProperty('eventAddressId');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('eventDate');
    expect(response.body[0]).toHaveProperty('responsible');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('phone');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[0]).toHaveProperty('address');
  });

  it('GET /events - Should not be able to access the route if is not authenticate', async () => {
    const response = await request(app.getHttpServer()).get('/events');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('GET /events - Should be able to list an event if is authenticated', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .get('/events/1')
      .auth(resToken.body.token, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('eventAddressId');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('eventDate');
    expect(response.body).toHaveProperty('responsible');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('phone');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('address');
  });

  it("GET /events/:id - Should not be able to access a event that doesn't exist ", async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .get('/events/15')
      .auth(resToken.body.token, { type: 'bearer' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('GET /events/:id - Should not be able to access the route if is not authenticate', async () => {
    const response = await request(app.getHttpServer()).get('/events/1');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('PATCH /events - Should be able to update an event if is the owner', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .patch('/events/1')
      .auth(resToken.body.token, { type: 'bearer' })
      .send(mockedEditEvent);

    expect(response.status).toBe(200);
  });

  it('PATCH /events - Should not be able to update an event that does not exist', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .patch('/events/5')
      .auth(resToken.body.token, { type: 'bearer' })
      .send(mockedEditEvent);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('This event does not exist.');
  });

  it('PATCH /events - Should not be able to update an event if is not the owner', async () => {
    await request(app.getHttpServer()).post('/users').send(mockedUserTwo);
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUserTwo);

    const response = await request(app.getHttpServer())
      .patch('/events/1')
      .auth(resToken.body.token, { type: 'bearer' })
      .send(mockedEditEvent);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('This user is not allowed.');
  });

  it('PATCH /events/:id/images - Should be able to add and delete new images to the event', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);
    const image = resolve(__dirname, '../assets/beach-image.jpg');

    const response = await request(app.getHttpServer())
      .patch('/events/1/images')
      .set('Content-Type', 'multipart/form-data')
      .auth(resToken.body.token, { type: 'bearer' })
      .attach('file', image);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('assetId');
    expect(response.body[0]).toHaveProperty('eventId');
    expect(response.body[0]).toHaveProperty('fileName');
    expect(response.body[0]).toHaveProperty('url');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');

    const responseTwo = await request(app.getHttpServer())
      .patch('/events/1/images')
      .set('Content-Type', 'multipart/form-data')
      .auth(resToken.body.token, { type: 'bearer' })
      .field('data', '{"imagesToDelete": [1]}');

    expect(responseTwo.status).toBe(200);
    expect(responseTwo.body).toHaveLength(0);
  });

  it('DELETE /events/:id - Should not be able to delete an event if is not the owner', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUserTwo);

    const response = await request(app.getHttpServer())
      .delete('/events/1')
      .auth(resToken.body.token, { type: 'bearer' });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('This user is not allowed.');
  });

  it("DELETE /events/:id - Should not be able to delete an event that doesn't exist", async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .delete('/events/5')
      .auth(resToken.body.token, { type: 'bearer' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('This event does not exist.');
  });

  it('DELETE /events/:id - Should be able to delete an event if is the owner', async () => {
    const resToken = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUser);

    const response = await request(app.getHttpServer())
      .delete('/events/1')
      .auth(resToken.body.token, { type: 'bearer' });

    expect(response.status).toBe(204);
  });
});
