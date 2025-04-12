import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller()
export class KafkaConsumerController {
  private readonly logger = new Logger(KafkaConsumerController.name);

  constructor(
    private readonly kafkaService: KafkaService, // Injecting the KafkaService to handle business logic
  ) {
    this.logger.log('KafkaConsumerController initialized!');
  }
  @MessagePattern('pr_events') // Listening to the 'my-topic' Kafka topic
  async consumeMessage(@Payload() data: any) {
    this.logger.log(`Received message: ${JSON.stringify(data)}`);
    try {
      const { owner, repo, number } = data;
      await this.kafkaService.processPr(owner, repo, number);
      this.logger.log(`Successfully processed PR: ${owner}/${repo}#${number}`);
    } catch (error) {
      this.logger.error(`Error processing PR: ${error.message}`);
      // Consider implementing a dead letter queue for failed messages
    }
  }
}
