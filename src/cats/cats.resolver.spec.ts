import { Test, TestingModule } from '@nestjs/testing';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.dto/create-cat-input.dto';
import { Cat } from './entities/cat/cat';


describe('CatsResolver', () => {
  let resolver: CatsResolver;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsResolver,
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

    resolver = module.get<CatsResolver>(CatsResolver);
    service = module.get<CatsService>(CatsService);
  });

  describe('createCat', () => {
    it('should create a cat', async () => {
      const createCatInput: CreateCatInput = { name: 'Tom', age: 3, breed: 'Siamese' };
      const result: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await resolver.createCat(createCatInput)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [{ id: 1, name: 'Tom', age: 3, breed: 'Siamese' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await resolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single cat', async () => {
      const result: Cat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await resolver.findOne(1)).toBe(result);
    });
  });
});
