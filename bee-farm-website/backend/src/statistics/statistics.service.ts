import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const [beeFamilies, flowers, honey] = await Promise.all([
      this.prisma.beeFamily.count(),
      this.prisma.malliferousPlant.count(),
      this.prisma.productivity.aggregate({
        _sum: {
          honey_kg: true,
        },
      }),
    ]);

    return {
      beeFamilies,
      flowers,
      honeyKg: honey._sum.honey_kg || 0,
    };
  }

  async getBeeGrowth() {
    const records = await this.prisma.beeFamily.findMany({
      select: { createdAt: true },
    });

    const stats: Record<string, number> = {};

    for (const rec of records) {
      const label = format(rec.createdAt, 'MMM', { locale: ru }); // Янв, Фев, ...
      stats[label] = (stats[label] || 0) + 1;
    }

    const labels = Object.keys(stats).sort((a, b) =>
      new Date(`2024 ${a}`) > new Date(`2024 ${b}`) ? 1 : -1
    );
    const data = labels.map(label => stats[label]);

    return { labels, data };
  }

  async getFlowerProductivity() {
    const records = await this.prisma.malliferousPlant.findMany({
      select: { createdAt: true },
    });

    const stats: Record<string, number> = {};

    for (const rec of records) {
      const label = format(rec.createdAt, 'MMM', { locale: ru });
      stats[label] = (stats[label] || 0) + 1;
    }

    const labels = Object.keys(stats).sort((a, b) =>
      new Date(`2024 ${a}`) > new Date(`2024 ${b}`) ? 1 : -1
    );
    const data = labels.map(label => stats[label]);

    return { labels, data };
  }
}
