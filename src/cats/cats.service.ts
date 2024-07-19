import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { Observable, map, of, tap } from 'rxjs';

@Injectable()
export class CatsService {
    private readonly cats: CreateCatDto[] = [];

    
    create(createCatDto: CreateCatDto) {
          // Генерируем уникальный ID для нового кота
    const id = this.cats.length ? this.cats[this.cats.length - 1].id + 1 : 1;
    const newCat = { ...createCatDto, id };
    this.cats.push(newCat);
        
      }
    
     
  // Метод для получения всех котов
  findAll(): Observable<CreateCatDto[]> {
    return of(this.cats).pipe(
      tap({
        next: cats => console.log('Cats in service:', cats),
        complete: () => console.log('Service: Stream complete')
      })
    );
  }


   // Метод для получения кота по ID
   findOne(id: number): Observable<CreateCatDto | undefined> {
    return of(this.cats).pipe(
      map(cats => cats.find(cat => cat.id === id))
    );
  }
}
