import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;
  private readonly logger = new Logger(GithubService.name);

  constructor() {
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  }

  async fetchPRDiff(
    owner: string,
    repo: string,
    number: number,
  ): Promise<string> {

    const { data } = await this.octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}',
      {
        owner,
        repo,
        pull_number: number,
        headers: {
          accept: 'application/vnd.github.v3.diff',
        },
      },
    );
    this.logger.log(`Fetched diff for PR response: ${data}`);
    return data?.toString() || ''; // Convert the response to a string
  }

  async commentOnPR(
    owner: string,
    repo: string,
    number: number,
    comment: string,
  ) {
    await this.octokit.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: `### 🤖 AI Review Feedback\n${comment}`,
    });
  }
}
