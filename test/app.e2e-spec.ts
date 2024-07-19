import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto/create-cat.dto';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect([]);
  });

  it('/cats (POST)', () => {
    const createCatDto: CreateCatDto = {  name: 'Tom', age: 3, breed: 'Siamese' };
    return request(app.getHttpServer())
      .post('/cats')
      .send(createCatDto)
      .expect(201)
      .expect({
        id: 1,
        name: 'Tom',
        age: 3,
        breed: 'Siamese'
      });
  });

  it('/cats/:id (GET)', () => {
    const createCatDto: CreateCatDto = { name: 'Tom', age: 3, breed: 'Siamese' };
    return request(app.getHttpServer())
      .post('/cats')
      .send(createCatDto)
      .then(() => {
        return request(app.getHttpServer())
          .get('/cats/1')
          .expect(200)
          .expect(createCatDto);
      });
  });

  it('/cats/:id (GET) - not found', () => {
    return request(app.getHttpServer())
      .get('/cats/999')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Cat not found',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
