import { Injectable, Logger } from '@nestjs/common';
import { KafkaConsumerService } from '../../service/kafka-consumer.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  async reviewPr() {
    this.logger.log('Starting PR review process...');
    const data = await this.kafkaConsumerService.getPrData();
    this.logger.log(`Received PR data from kafka: ${JSON.stringify(data)}`);

    return { received: true };
  }
}
