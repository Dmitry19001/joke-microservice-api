import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TestMessage } from './test.message';

@Injectable()
export class TestService {
    constructor(
        @Inject('JOKE_SERVICE') private readonly jokeClient: ClientProxy,
        @Inject('JOKE_USERSERVICE') private readonly userService: ClientProxy,
        @Inject('JOKE_LOGSERVICE') private readonly logService: ClientProxy
        ) {}

    async handleRequestResponseMessage(): Promise<string> {
        const result$ = this.jokeClient.send<any>({cmd: 'test_request'}, new TestMessage('message content'));
        const resultValue = await firstValueFrom(result$);

        const userResult$ = this.userService.send<any>({cmd: 'test_request'}, new TestMessage('message content'));
        const userResultValue = await firstValueFrom(userResult$);

        const logResult$ = this.logService.send<any>({cmd: 'test_request'}, new TestMessage('message content'));
        const logResultValue = await firstValueFrom(logResult$);
        return `${resultValue} / ${userResultValue} / ${logResultValue}`;
    }
 }
