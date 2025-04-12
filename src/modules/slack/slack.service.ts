// slack.service.ts
import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private slack: WebClient;

  constructor() {
    this.slack = new WebClient(process.env.SLACK_BOT_TOKEN); // store token in .env
  }

  async sendMessage(channel: string, message: string) {
    try {
      await this.slack.chat.postMessage({
        channel, // can be '#channel-name' or a user ID
        text: message,
      });
    } catch (error) {
      console.error('Error sending Slack message:', error);
    }
  }
}
