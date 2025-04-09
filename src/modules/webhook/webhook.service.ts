import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async processGithubEvent(event: string, payload: any) {
    if (event === 'pull_request') {
      const { number, base } = payload.pull_request;
      const owner = base.repo.owner.login;
      const repo = base.repo.name;
      this.logger.log(`Processing PR event for ${owner}/${repo}#${number}`);
      await this.kafkaService.addPrToQueue(owner, repo, number);

      // Add logic for reviewing PR or sending a comment here
    }

    return { received: true };
  }
}
