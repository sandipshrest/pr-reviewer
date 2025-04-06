import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService {
  @MessagePattern('my-topic') // Listening to the 'my-topic' Kafka topic
  async consumeMessage(@Payload() data: any) {
    console.log('Message received:', data);
    // Handle the consumed message here
  }
}
