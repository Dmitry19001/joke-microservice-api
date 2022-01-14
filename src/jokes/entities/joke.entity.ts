import { Category } from "src/categories/entities/category.entity";

export class Joke {
    id: number;
    name: string;
    text: string;
    rating: number;
    unitprice: number;
    created: Date;
    modified: Date;
    isActive: boolean;
    category: Category;
}