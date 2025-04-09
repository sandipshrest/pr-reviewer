import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GithubWebhookDto } from './dto/github-webhook.dto';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger();
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async handleGithubWebhook(
    @Body() body: any,
    @Headers('x-github-event') event: string,
  ) {
    const payload = JSON.parse(body.payload);
    if (
      event === 'pull_request' &&
      ['opened', 'synchronize'].includes(payload.action)
    ) {
      await this.webhookService.processGithubEvent(event, payload);
    }
  }
}
