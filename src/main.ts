import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'my-kafka-client', // Choose a client ID for your app
        brokers: ['localhost:9092'], // Kafka broker URLs
      },
      consumer: {
        groupId: 'my-kafka-consumer', // Choose a unique consumer group ID
        // allowAutoTopicCreation: true,
        // sessionTimeout: 30000,
        // heartbeatInterval: 3000,
      },
    },
  });

  await app.startAllMicroservices(); // Start Kafka microservice
  await app.listen(process.env.PORT ?? 8000, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
}
bootstrap();
