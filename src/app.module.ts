import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './modules/webhook/webhook.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AiModule } from './modules/ai/ai.module';
import { GithubModule } from './modules/github/github.module';

ConfigModule.forRoot();

@Module({
  imports: [WebhookModule, KafkaModule, AiModule, GithubModule], // Import KafkaModule here
})
export class AppModule {}
