import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { CategoriesModule } from './categories/categories.module';
import ClientConfig from './client-config.hostos';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      // JOKE SERVICE
      {
        name: 'JOKE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: ClientConfig.microserviceOptions.host,
          port: ClientConfig.microserviceOptions.port
        }
      },
      // USER SERVICE
      {
        name: 'JOKE_USERSERVICE',
        transport: Transport.TCP,
        options: {
          host: ClientConfig.userserviceOptions.host,
          port: ClientConfig.userserviceOptions.port
        }
      },
      // LOG SERVICE
      {
        name: 'JOKE_LOGSERVICE',
        transport: Transport.TCP,
        options: {
          host: ClientConfig.logserviceOptions.host,
          port: ClientConfig.logserviceOptions.port
        }
      },
    ]),
    TestModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],

  exports: [ClientsModule]
})
export class AppModule {}
