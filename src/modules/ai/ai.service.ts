import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  reviewPr(event: string, payload: any) {
    this.logger.log(`Received event: ${event}`);
    if (event === 'pull_request') {
      this.logger.log('payload: ', payload);
      const { action, pull_request } = payload;
      console.log(`Action: ${action}`);
      this.logger.log(`PR ${action}: ${pull_request?.title}`);
      // Add logic for reviewing PR or sending a comment here
    }

    return { received: true };
  }
}
