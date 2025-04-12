import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './modules/webhook/webhook.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AiModule } from './modules/ai/ai.module';
import { GithubModule } from './modules/github/github.module';
import { SlackModule } from './modules/slack/slack.module';

ConfigModule.forRoot();

@Module({
  imports: [WebhookModule, KafkaModule, AiModule, GithubModule, SlackModule],
  providers: [], // Import KafkaModule here
})
export class AppModule {}
