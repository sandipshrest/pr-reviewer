import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { KafkaModule } from '../../service/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
