import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('summary')
  getSummary() {
    return this.statisticsService.getSummary();
  }
  
  @Get('bee-growth')
  getBeeGrowth() {
    return this.statisticsService.getBeeGrowth();
  }

  @Get('flower-productivity')
  getFlowerProductivity() {
    return this.statisticsService.getFlowerProductivity();
  }
}
