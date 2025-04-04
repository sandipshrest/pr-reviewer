import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './modules/webhook/webhook.module';
import { TestModule } from './modules/test/test.module';

ConfigModule.forRoot();

@Module({
  imports: [WebhookModule, TestModule],
})
export class AppModule {}
