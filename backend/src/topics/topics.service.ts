import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.topic.findUnique({
      where: { id },
      include: {
        category: true,
        quizzes: true,
        progress: true,
      },
    });
  }

  async completeQuiz(topicId: number, score: number) {
    return this.prisma.userProgress.upsert({
      where: { topicId },
      update: { completed: true, score },
      create: { topicId, completed: true, score },
    });
  }
}
