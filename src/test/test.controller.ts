import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService){}
    
    @Get()
    async getMessageHandler(): Promise<string>{
        const retVal = this.testService.handleRequestResponseMessage();
        console.log(retVal);
        return retVal;
    }
}
