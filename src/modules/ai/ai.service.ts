import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
  }

  async reviewPr(diff: string) {
    this.logger.log('Starting PR review process...');
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Please review the following code changes and provide feedback:\n\n${diff}`;
    const { response } = await model.generateContent(prompt);
    return response.text();
  }
}
