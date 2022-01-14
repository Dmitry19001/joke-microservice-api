import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LogsService } from 'src/logs/logs.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { Joke } from './entities/joke.entity';

@Injectable()
export class JokesService {
    constructor(
        @Inject('JOKE_SERVICE') private readonly jokeClient: ClientProxy,
        private readonly logsService: LogsService
    ){}

    async insertJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
        const jokeResult$ = this.jokeClient.send({cmd: "create_joke_request"}, createJokeDto);
        const value = await firstValueFrom(jokeResult$);
        const log = await this.logsService.createLog("create_joke_request","student-joke-microservice-api", value.id, value.categoryId ? value.categoryId : "");
        return value;
    }

    async getJokes(): Promise<Joke[]> {
        const jokeResult$ = this.jokeClient.send({cmd: "get_jokes_request"}, new CreateJokeDto);
        const value = await firstValueFrom(jokeResult$);
        const log = await this.logsService.createLog("get_jokes_request","student-joke-microservice-api", value.id, value.categoryId ? value.categoryId : "");
        return value;
    }

    async getJokeById(id : number): Promise<Joke> {
        console.log(`[getJokeById] got request with param: ${id}`);
        const jokeResult$ = this.jokeClient.send({cmd: "get_joke_byid_request"}, id);
        const value = await firstValueFrom(jokeResult$);
        const log = await this.logsService.createLog("get_joke_byid_request","student-joke-microservice-api", value.id, value.categoryId ? value.categoryId : "");
        return value;
    }

    async getJokesByCategoryId(id : number): Promise<Joke[]> {
        const jokeResult$ = this.jokeClient.send({cmd: "get_jokes_bycategoryid_request"}, id);
        const value = await firstValueFrom(jokeResult$);
        const log = await this.logsService.createLog("get_jokes_bycategoryid_request","student-joke-microservice-api", value.id, value.categoryId ? value.categoryId : "");
        return value;
    }

    async deleteJokeById(id : number): Promise<Joke> {
        const jokeResult$ = this.jokeClient.send({cmd: "delete_joke_byid_request"}, id);
        const value = await firstValueFrom(jokeResult$);
        const log = await this.logsService.createLog("delete_joke_byid_request","student-joke-microservice-api", value.id, value.categoryId ? value.categoryId : "");
        return value;
    }
}
