import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [PrismaModule, CategoriesModule, TopicsModule],
})
export class AppModule {}
