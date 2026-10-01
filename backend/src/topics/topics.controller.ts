import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Post(':id/complete')
  completeQuiz(@Param('id') id: string, @Body('score') score: number) {
    return this.topicsService.completeQuiz(+id, score);
  }
}
