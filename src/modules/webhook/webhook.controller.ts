import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GithubWebhookDto } from './dto/github-webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(200) // Respond quickly to GitHub
  handleGithubWebhook(
    @Body() body: GithubWebhookDto,
    @Headers('x-github-event') event: string,
  ) {
    return this.webhookService.processGithubEvent(event, body);
  }
}
