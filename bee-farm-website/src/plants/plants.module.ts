import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Подключаем Prisma
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}