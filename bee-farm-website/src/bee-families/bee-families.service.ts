import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BeeFamily } from '@prisma/client';

@Injectable()
export class BeeFamiliesService {
  constructor(private prisma: PrismaService) {}

  // Создание новой пчелосемьи
  async createFamily(userId: number, data: {
    beefamily_number: string;
    queen_birth_year?: number;
    mother_family?: string;
    queen_breed?: string;
    queen_line?: string;
  }): Promise<BeeFamily> {
    return this.prisma.beeFamily.create({
      data: {
        user_id: userId,
        beefamily_number: data.beefamily_number,
        queen_birth_year: data.queen_birth_year,
        mother_family: data.mother_family,
        queen_breed: data.queen_breed,
        queen_line: data.queen_line,
      },
    });
  }

  // Получение всех пчелосемей пользователя
  async getFamilies(userId: number): Promise<BeeFamily[]> {
    return this.prisma.beeFamily.findMany({
      where: { user_id: userId },
      include: {
        inspections: true,  // Включаем связанные осмотры
        productivity: true, // Включаем данные по продуктивности
      },
    });
  }
}