import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsResolver } from './cats.resolver';

@Module({
    controllers: [CatsController],
    providers: [CatsService, CatsResolver],
})


export class CatsModule {}
