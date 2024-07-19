import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { Cat } from './entities/cat/cat';


describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();
    
    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  }); 

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [{ id: 1, name: 'Tom', age: 3, breed: 'Siamese' }];
      jest.spyOn(catsService, 'findAll').mockResolvedValue(result);

      expect(await catsController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const createCatDto: CreateCatDto = {  name: 'Tom', age: 3, breed: 'Siamese' };
      const result: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      jest.spyOn(catsService, 'create').mockResolvedValue(result);

      expect(await catsController.create(createCatDto)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single cat', async () => {
      const result: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      jest.spyOn(catsService, 'findOne').mockResolvedValue(result);

      expect(await catsController.findOne(1)).toBe(result);
    });

    it('should throw an exception if cat is not found', async () => {
      jest.spyOn(catsService, 'findOne').mockResolvedValue(null);

      try {
        await catsController.findOne(1);
      } catch (e) {
        expect(e.message).toBe('Cat not found');
        expect(e.status).toBe(404);
      }
    });
  });
});
