import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  describe('create', () => {
    it('should create a cat', () => {
      const createCatDto: CreateCatDto = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      service.create(createCatDto);

      service.findAll().subscribe(cats => {
        expect(cats).toContainEqual(createCatDto);
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const createCatDto: CreateCatDto = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      service.create(createCatDto);

      service.findAll().subscribe(cats => {
        expect(cats).toEqual([createCatDto]);
      });
    });
  });

  describe('findOne', () => {
    it('should return a single cat', () => {
      const createCatDto: CreateCatDto = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };
      service.create(createCatDto);

      service.findOne(1).subscribe(cat => {
        expect(cat).toEqual(createCatDto);
      });
    });

    it('should return undefined if cat not found', () => {
      service.findOne(1).subscribe(cat => {
        expect(cat).toBeUndefined();
      });
    });
  });
});
