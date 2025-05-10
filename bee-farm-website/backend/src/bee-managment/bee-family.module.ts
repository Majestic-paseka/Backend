import { Module } from '@nestjs/common';
import { BeeFamilyController } from './bee-family.controller';
import { BeeFamilyService } from './bee-family.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BeeFamilyController],
  providers: [BeeFamilyService],
})
export class BeeFamilyModule {}
