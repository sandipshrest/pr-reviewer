import { Injectable, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/github-webhook.dto';
import { KafkaProducerService } from '../../service/kafka-producer.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  async processGithubEvent(event: string, payload: GithubWebhookDto) {
    if (event === 'pull_request') {
      const { action, pull_request } = payload;
      try {
        this.logger.log(`Received PR event: ${action}`);
        await this.kafkaProducerService.sendMessage('pr_events', {
          action,
        });
        this.logger.log(`Successfully sent PR event to Kafka`);
      } catch (err) {
        this.logger.error(`Error sending PR event to Kafka: ${err.message}`);
      }
      // Add logic for reviewing PR or sending a comment here
    }

    return { received: true };
  }
}
