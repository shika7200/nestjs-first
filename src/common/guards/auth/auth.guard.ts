import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

// Пример простой валидации запроса
function validateRequest(request: any): boolean {
  // Простая логика аутентификации
  return true; // В реальном приложении здесь должна быть проверка токена или сессии
}