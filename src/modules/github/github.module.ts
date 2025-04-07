import { Module } from '@nestjs/common';
import { GithubService } from './github.service';

@Module({
  providers: [GithubService], // Register GithubService as a provider
  exports: [GithubService], // Export GithubService to be used in other modules
})

export class GithubModule {}
