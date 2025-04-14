import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProductivityService } from './productivity.service';

@Controller('productivity')
export class ProductivityController {
  constructor(private readonly productivityService: ProductivityService) {}

  @Post()
  create(@Body() data: {
    beefamily_id: number;
    productivity_year: number;
    honey_kg?: number;
    wax_kg?: number;
  }) {
    return this.productivityService.createProductivityRecord(data);
  }

  @Get(':beefamily_id')
  findByFamily(@Param('beefamily_id') beefamily_id: string) {
    return this.productivityService.getYearlyStats(Number(beefamily_id));
  }
}