import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaProducerService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Subscribe to any topics you want to receive responses from
    // this.kafkaClient.subscribeToResponseOf('pr_events'); // optional
    await this.kafkaClient.connect(); // important!
  }

  async sendMessage<T>(topic: string, message: T) {
    this.kafkaClient.emit<string, T>(topic, message);
    this.logger.log(
      `Message sent to topic ${topic}: ${JSON.stringify(message)}`,
    );
  }
}
