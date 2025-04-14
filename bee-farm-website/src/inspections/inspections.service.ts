import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Inspection } from '@prisma/client';

@Injectable()
export class InspectionsService {
  constructor(private prisma: PrismaService) {}

  async createInspection(data: {
    beefamily_id: number;
    data_of_inspection: Date;
    power_of_family?: number;
    total_frames?: number;
    brood_frames?: number;
    notes_of_inspection?: string;
  }): Promise<Inspection> {
    return this.prisma.inspection.create({ data });
  }

  async getInspectionsByFamily(beefamily_id: number): Promise<Inspection[]> {
    return this.prisma.inspection.findMany({
      where: { beefamily_id },
      orderBy: { data_of_inspection: 'desc' },
    });
  }
}