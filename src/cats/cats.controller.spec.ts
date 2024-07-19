import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

import { of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();
    
    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  }); 

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: CreateCatDto[] = [{ id: 1, name: 'Tom', age: 3, breed: 'Siamese' }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => of(result));

      catsController.findAll().subscribe(cats => {
        expect(cats).toBe(result);
      });
    });
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const createCatDto: CreateCatDto = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      jest.spyOn(catsService, 'create').mockImplementation(() => {});

      expect(await catsController.create(createCatDto)).toBeUndefined();
    });
  });

  describe('findOne', () => {
    it('should return a single cat', async () => {
      const result: CreateCatDto = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      jest.spyOn(catsService, 'findOne').mockImplementation(() => of(result));

      catsController.findOne(1).subscribe(cat => {
        expect(cat).toBe(result);
      });
    });

    it('should throw an exception if cat not found', async () => {
      jest.spyOn(catsService, 'findOne').mockImplementation(() => of(undefined));

      try {
        await catsController.findOne(1).toPromise();
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Cat not found');
      }
    });
  });
});
