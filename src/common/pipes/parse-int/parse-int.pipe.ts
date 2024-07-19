import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  // Метод transform преобразует и валидирует данные
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10); // Преобразуем строку в число
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed'); // Бросаем исключение, если значение не является числом
    }
    return val;
  }
}
