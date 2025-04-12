import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { AiModule } from '../ai/ai.module';
import { GithubModule } from '../github/github.module';
import { KafkaConsumerController } from './kafka-consumer.controller';
import { KafkaProducerService } from './kafka-producer.service';
import { SlackModule } from '../slack/slack.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-kafka-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-kafka-consumer',
          },
        },
      },
    ]),
    AiModule,
    GithubModule,
    SlackModule,
  ],
  controllers: [KafkaConsumerController], // Register KafkaConsumerController
  providers: [KafkaService, KafkaProducerService],
  exports: [KafkaService], // Ensure services are exported
})
export class KafkaModule {}
