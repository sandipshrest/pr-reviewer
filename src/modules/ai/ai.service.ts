import { Injectable, Logger } from '@nestjs/common';
import { KafkaConsumerService } from '../kafka/kafka-consumer.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;
  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
  }

  async reviewPr() {
    this.logger.log('Starting PR review process...');
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const data = await this.kafkaConsumerService.getPrData();
    this.logger.log(`Received PR data from kafka: ${JSON.stringify(data)}`);

    return { received: true };
  }
}
