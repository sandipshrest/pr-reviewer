import { Injectable, Logger } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { GithubService } from '../github/github.service';
import { AiService } from '../ai/ai.service';
import { SlackService } from '../slack/slack.service';
export interface PrEvent {
  key: string;
  value: {
    owner: string;
    repo: string;
    number: number;
  };
}

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly githubService: GithubService,
    private readonly aiService: AiService,
    private readonly slackService: SlackService, // Injecting the SlackService to send messages to Slack
  ) {}

  async addPrToQueue(owner: string, repo: string, number: number) {
    this.logger.log(`Adding PR to queue: ${owner}/${repo}#${number}`);
    try {
      await this.kafkaProducerService.sendMessage<PrEvent>('pr_events', {
        key: `${owner}/${repo}#${number}`,
        value: {
          owner,
          repo,
          number,
        },
      });
      this.logger.log(`Successfully added PR to queue`);
    } catch (err) {
      this.logger.error(`Error adding PR to queue: ${err.message}`);
    }
  }

  async processPr(owner: string, repo: string, number: number) {
    this.logger.log(`Processing PR: ${owner}/${repo}#${number}`);
    const diff = await this.githubService.fetchPRDiff(owner, repo, number);

    const aiFeedback = await this.aiService.reviewPr(diff);

    await this.githubService.commentOnPR(owner, repo, number, aiFeedback);

    // Post to Slack
    await this.slackService.sendMessage(
      '#pr-reviews',
      `🤖 *AI Review posted on GitHub PR #${number}*`,
    );
    this.logger.log(`Successfully commented on PR with AI feedback`);
  }
}
