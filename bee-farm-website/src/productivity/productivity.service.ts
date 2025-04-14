import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Productivity } from '@prisma/client';

@Injectable()
export class ProductivityService {
  constructor(private prisma: PrismaService) {}

  async createProductivityRecord(data: {
    beefamily_id: number;
    productivity_year: number;
    honey_kg?: number;
    wax_kg?: number;
  }): Promise<Productivity> {
    return this.prisma.productivity.create({ data });
  }

  async getYearlyStats(beefamily_id: number): Promise<Productivity[]> {
    return this.prisma.productivity.findMany({
      where: { beefamily_id },
      orderBy: { productivity_year: 'desc' },
    });
  }
}