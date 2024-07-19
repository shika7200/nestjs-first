import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat/cat';


@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService, CatsResolver],
  controllers: [CatsController],
})
export class CatsModule {}
