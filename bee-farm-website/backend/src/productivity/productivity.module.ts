import { Module } from '@nestjs/common';
import { ProductivityService } from './productivity.service';
import { ProductivityController } from './productivity.controller';

@Module({
  controllers: [ProductivityController],
  providers: [ProductivityService],
})
export class ProductivityModule {}
