import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Cat } from './entities/cat/cat';

const mockCat = { id: 1, name: 'Tom', age: 3, breed: 'Siamese' };

const mockRepository = () => ({
  create: jest.fn().mockReturnValue(mockCat),
  save: jest.fn().mockResolvedValue(mockCat),
  find: jest.fn().mockResolvedValue([mockCat]),
  findOne: jest.fn().mockResolvedValue(mockCat),
});

describe('CatsService', () => {
  let service: CatsService;
  let repository: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const createCatDto = { name: 'Tom', age: 3, breed: 'Siamese' };
      expect(await service.create(createCatDto)).toEqual(mockCat);
      expect(repository.create).toHaveBeenCalledWith(createCatDto);
      expect(repository.save).toHaveBeenCalledWith(mockCat);
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      expect(await service.findAll()).toEqual([mockCat]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single cat', async () => {
      expect(await service.findOne(1)).toEqual(mockCat);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
