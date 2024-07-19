import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/filters/http-exception/http-exception.filter';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging/logging.interceptor';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';


@Controller('cats') // Устанавливаем маршрут для контроллера (например, /cats)
@UseGuards(AuthGuard) // Применяем guard для проверки доступа
@UseInterceptors(LoggingInterceptor) // Применяем interceptor для логирования
@UseFilters(HttpExceptionFilter) // Применяем exception filter для обработки ошибок
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll() {
    return this.catsService.findAll(); // Возвращаем список всех котов
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto); // Создаем нового кота
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cat = await this.catsService.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', 404); // Бросаем исключение, если кот не найден
    }
    return cat;
  }
}
