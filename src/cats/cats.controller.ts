import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/filters/http-exception/http-exception.filter';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging/logging.interceptor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';

@Controller('cats') // Устанавливаем маршрут для контроллера (например, /cats)
@UseGuards(AuthGuard) // Применяем guard для проверки доступа
@UseInterceptors(LoggingInterceptor) // Применяем interceptor для логирования
@UseFilters(HttpExceptionFilter) // Применяем exception filter для обработки ошибок
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Observable<CreateCatDto[]> {
    return this.catsService.findAll(); // Возвращаем список всех котов
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto); // Создаем нового кота
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<CreateCatDto> {
    return this.catsService.findOne(id).pipe(
      map(cat => {
        if (!cat) {
          throw new HttpException('Cat not found', 404); // Бросаем исключение, если кот не найден
        }
        return cat;
      })
    );
  }
}
