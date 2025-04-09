import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './modules/webhook/webhook.module';
import { KafkaModule } from './modules/kafka/kafka.module';

ConfigModule.forRoot();

@Module({
  imports: [WebhookModule, KafkaModule], // Import KafkaModule here
})
export class AppModule {}
