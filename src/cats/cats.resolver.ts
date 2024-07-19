import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.dto/create-cat-input.dto';
import { Cat } from './entities/cat/cat';
    

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat])
  async findAll() {
    return this.catsService.findAll();
  }

  @Query(() => Cat, { nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.findOne(id);
  }

  @Mutation(() => Cat)
  async createCat(@Args('createCatInput') createCatInput: CreateCatInput) {
    return this.catsService.create(createCatInput);
  }
}
