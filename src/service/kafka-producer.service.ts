import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async sendMessage() {
    const message = {
      value: 'This is a test message from Kafka producer',
    };
    // Send a message to 'my-topic' Kafka topic
    await this.kafkaClient.emit('my-topic', message);
  }
}
