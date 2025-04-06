import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService {
  private prData: any; // Store the consumed PR data

  @MessagePattern('pr_events') // Listening to the 'my-topic' Kafka topic
  async consumeMessage(@Payload() data: any) {
    this.prData = data; // Store the data for later access
    console.log('Message received:', data);
  }

  getPrData() {
    return this.prData; // Return the stored PR data
  }
}
