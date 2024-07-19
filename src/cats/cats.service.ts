import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { Cat } from './entities/cat/cat';


@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    this.logger.debug(`Creating a cat with data: ${JSON.stringify(createCatDto)}`);
    try {
      const cat = this.catsRepository.create(createCatDto);
      this.logger.debug(`Cat entity created: ${JSON.stringify(cat)}`);
      const savedCat = await this.catsRepository.save(cat);
      this.logger.debug(`Cat saved to database: ${JSON.stringify(savedCat)}`);
      return savedCat;
    } catch (error) {
      this.logger.error(`Error creating cat: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne({ where: { id } });
  }
}
