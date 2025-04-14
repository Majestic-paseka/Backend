import { Module } from '@nestjs/common';
import { BeeFamiliesService } from './bee-families.service';
import { BeeFamiliesController } from './bee-families.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Подключаем Prisma
  controllers: [BeeFamiliesController],
  providers: [BeeFamiliesService],
})
export class BeeFamiliesModule {}