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
    this.logger.log(`Diff: ${diff}`);
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `
    You are a senior software engineer reviewing a pull request.
    
    Here is the code diff:
    ${diff}
    
    Please:
    1. Summarize what the code changes do.
    2. Point out any potential bugs or issues.
    3. Suggest any improvements in structure, naming, or best practices.
    4. Highlight any unnecessary or debug code that shouldn't go to production.
    
    Respond like a code reviewer.
    `;
    const { response } = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });
    this.logger.log('AI review completed.', response.text());

    return response.text();
  }
}
