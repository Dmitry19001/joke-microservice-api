import { Joke } from "src/jokes/entities/joke.entity";

export class Category {
    id: number;
    name: string;
    description: string;
    created: Date;
    modified: Date;
    isActive: boolean;
    jokes: Joke[];
}