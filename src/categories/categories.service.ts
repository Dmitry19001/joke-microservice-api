import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

    constructor(@Inject('JOKE_SERVICE') private readonly jokeClient: ClientProxy){}

    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const categoryResult$ = this.jokeClient.send({cmd: "create_category_request"}, createCategoryDto);
        const value = await firstValueFrom(categoryResult$);
        return value;
    }

    async getCategories(): Promise<Category[]> {
        const categoryResult$ = this.jokeClient.send({cmd: "get_categories_request"}, new CreateCategoryDto);
        const value = await firstValueFrom(categoryResult$);
        return value;
    }
}
