import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './modules/webhook/webhook.module';
import { KafkaProducerService } from './service/kafka-producer.service';
import { KafkaConsumerService } from './service/kafka-consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

ConfigModule.forRoot();

@Module({
  imports: [
    WebhookModule,
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
  ],
  providers: [KafkaProducerService, KafkaConsumerService],
})
export class AppModule {}
