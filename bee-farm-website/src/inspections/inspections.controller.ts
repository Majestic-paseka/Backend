import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { InspectionsService } from './inspections.service';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  create(@Body() data: {
    beefamily_id: number;
    data_of_inspection: string; // ISO строка даты
    power_of_family?: number;
    notes_of_inspection?: string;
  }) {
    return this.inspectionsService.createInspection({
      ...data,
      data_of_inspection: new Date(data.data_of_inspection),
    });
  }

  @Get(':beefamily_id')
  findByFamily(@Param('beefamily_id') beefamily_id: string) {
    return this.inspectionsService.getInspectionsByFamily(Number(beefamily_id));
  }
}