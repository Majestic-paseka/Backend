import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  // Добавление нового растения
  @Post()
  createPlant(@Body() data: {
    plant_name: string;
    plant_species?: string;
    honey_price?: number;
  }) {
    return this.plantsService.createPlant(data);
  }

  // Получение всех растений
  @Get()
  getAllPlants() {
    return this.plantsService.getAllPlants();
  }

  // Получение растения по ID
  @Get(':id')
  getPlant(@Param('id') id: string) {
    return this.plantsService.getPlantById(Number(id));
  }
}