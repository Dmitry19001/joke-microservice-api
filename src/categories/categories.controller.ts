import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService){}

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto ): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto);
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }
}
