import { Injectable, Logger } from '@nestjs/common';
import { GithubWebhookDto } from './dto/github-webhook.dto';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  processGithubEvent(event: string, payload: GithubWebhookDto) {
    this.logger.log(`Received event: ${event}`);
    if (event === 'pull_request') {
      const { action, pull_request } = payload;
      this.logger.log(`PR ${action}: ${pull_request.title}`);
      // Add logic for reviewing PR or sending a comment here
    }

    return { received: true };
  }
}
