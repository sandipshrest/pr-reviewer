import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ],
    providers: [KafkaProducerService, KafkaConsumerService],
    exports: [KafkaProducerService, KafkaConsumerService], // Ensure services are exported
  })
  export class KafkaModule {}
  
