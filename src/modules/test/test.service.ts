import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  sendNormalText() {
    this.logger.log('Sending normal text response');
    // Add logic for sending a normal text response here
    return { message: 'Normal text response' };
    // return { received: true };
  }
}
