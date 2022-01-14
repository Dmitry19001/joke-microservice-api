import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class CategoriesService {

    constructor(
        @Inject('JOKE_SERVICE') private readonly jokeClient: ClientProxy,
        private readonly logsService: LogsService
        ){}

    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const categoryResult$ = this.jokeClient.send({cmd: "create_category_request"}, createCategoryDto);
        const value = await firstValueFrom(categoryResult$);

        const log = await this.logsService.createLog("create_category_request","student-joke-microservice-api", "", value.id);

        return value;
    }

    async getCategories(): Promise<Category[]> {
        const categoryResult$ = this.jokeClient.send({cmd: "get_categories_request"}, '');
        const value = await firstValueFrom(categoryResult$);

        const log = await this.logsService.createLog("get_categories_request","student-joke-microservice-api", "", value.id);

        return value;
    }

    async getCategoryById(id : number) : Promise<Category> {
        const categoryResult$ = this.jokeClient.send({cmd: "get_categorybyid_request"}, id);
        const value = await firstValueFrom(categoryResult$);

        const log = await this.logsService.createLog("get_categorybyid_request","student-joke-microservice-api", "", value.id);

        return value;
    }

    async deleteCategoryById(id : number) : Promise<Category> {
        const categoryResult$ = this.jokeClient.send({cmd: "delete_categorybyid_request"}, id);
        const value = await firstValueFrom(categoryResult$);

        const log = await this.logsService.createLog("delete_categorybyid_request","student-joke-microservice-api", "", value.id);

        return value;
    }
}
