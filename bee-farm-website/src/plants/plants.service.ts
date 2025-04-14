import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MalliferousPlant } from '@prisma/client';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  // Создание нового растения
  async createPlant(data: {
    plant_name: string;
    plant_species?: string;
    honey_price?: number;
    start_blooming?: Date;
    end_blooming?: Date;
  }): Promise<MalliferousPlant> {
    return this.prisma.malliferousPlant.create({ data });
  }

  // Получение всех растений
  async getAllPlants(): Promise<MalliferousPlant[]> {
    return this.prisma.malliferousPlant.findMany();
  }

  // Получение растения по ID
  async getPlantById(id: number): Promise<MalliferousPlant | null> {
    return this.prisma.malliferousPlant.findUnique({ where: { plant_id: id } });
  }
}