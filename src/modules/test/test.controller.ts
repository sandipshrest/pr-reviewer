import { Controller, Post, Body, Headers, HttpCode, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @HttpCode(200) // Respond quickly to GitHub
  handleTest() {
    return this.testService.sendNormalText();
  }
}
