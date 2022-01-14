import { Module } from '@nestjs/common';
import { LogsModule } from 'src/logs/logs.module';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';

@Module({
  imports: [LogsModule],
  controllers: [JokesController],
  providers: [JokesService]
})
export class JokesModule {}
