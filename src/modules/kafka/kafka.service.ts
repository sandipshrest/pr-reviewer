import { Injectable, Logger } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { GithubService } from '../github/github.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly githubService: GithubService,
    private readonly aiService: AiService,
  ) {}

  async addPrToQueue(owner: string, repo: string, number: number) {
    this.logger.log(`Adding PR to queue: ${owner}/${repo}#${number}`);
    try {
      await this.kafkaProducerService.sendMessage('pr_events', {
        owner,
        repo,
        number,
      });
      this.logger.log(`Successfully added PR to queue`);
    } catch (err) {
      this.logger.error(`Error adding PR to queue: ${err.message}`);
    }
  }

  async processPr(owner: string, repo: string, number: number) {
    const diff = await this.githubService.fetchPRDiff(owner, repo, number);

    const aiFeedback = await this.aiService.reviewPr(diff);

    await this.githubService.commentOnPR(owner, repo, number, aiFeedback);
    this.logger.log(`Successfully commented on PR with AI feedback`);
  }
}
