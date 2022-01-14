import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    @Get(':id')
    async getCategoryById(@Param('id') id : number): Promise<Category> {
        return await this.categoriesService.getCategoryById(id);
    }

    @Delete(':id')
    async deleteCategoryById(@Param('id') id : number): Promise<Category> {
        return await this.categoriesService.deleteCategoryById(id);
    }
    
}
