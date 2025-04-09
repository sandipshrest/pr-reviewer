import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaConsumerService {
  private readonly logger = new Logger(KafkaConsumerService.name);

  constructor(private readonly kafkaService: KafkaService) {}
  @MessagePattern('pr_events') // Listening to the 'my-topic' Kafka topic
  async consumeMessage(@Payload() data: any) {
    this.logger.log(`Received message: ${JSON.stringify(data)}`);
    const { owner, repo, number } = data.value;
    this.kafkaService.processPr(owner, repo, number);
  }
}
