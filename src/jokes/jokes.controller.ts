import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Joke } from './entities/joke.entity';
import { JokesService } from './jokes.service';

@Controller('jokes')
export class JokesController {

    constructor(private readonly jokesService: JokesService){}

    @Post()
    async createJoke(@Body() createJokeDto: CreateJokeDto ): Promise<Joke> {
        return await this.jokesService.insertJoke(createJokeDto);
    }

    @Get()
    async getJokes(): Promise<Joke[]> {
        return await this.jokesService.getJokes();
    }

    @Get(':id')
    async getJokeById(@Param('id') id : number): Promise<Joke> {
        console.log(`Sending getJokeById request with param: ${id}`);
        return await this.jokesService.getJokeById(id);
    }

    @Get('bycategory/:id')
    async getJokesByCategoryId(@Param('id') id : number): Promise<Joke[]> {
        return await this.jokesService.getJokesByCategoryId(id);
    }

    @Delete(':id')
    async deleteJokeById(@Param('id') id : number): Promise<Joke> {
        return await this.jokesService.deleteJokeById(id);
    }
}
