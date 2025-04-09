import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  providers: [AiService],
  exports: [AiService], // Export AiService to be used in other modules
})
export class AiModule {}
