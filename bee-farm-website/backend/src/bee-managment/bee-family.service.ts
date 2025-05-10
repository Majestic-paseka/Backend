import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BeeFamilyService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: number) {
    return this.prisma.beeFamily.findMany({
      where: { user_id: userId },
      orderBy: { beefamily_id: 'asc' }
    });
  }

  async create(userId: number, dto: any) {
    return this.prisma.beeFamily.create({
      data: {
        user_id: userId,
        beefamily_number: dto.beefamily_number,
        queen_birth_year: dto.queen_birth_year,
        mother_family: dto.mother_family,
        queen_breed: dto.queen_breed,
        queen_line: dto.queen_line,
        createdAt: new Date()
      }
    });
  }

  async update(id: number, dto: any) {
    return this.prisma.beeFamily.update({
      where: { beefamily_id: id },
      data: {
        beefamily_number: dto.beefamily_number,
        queen_birth_year: dto.queen_birth_year,
        mother_family: dto.mother_family,
        queen_breed: dto.queen_breed,
        queen_line: dto.queen_line
      }
    });
  }

  async delete(id: number) {
    return this.prisma.beeFamily.delete({
      where: { beefamily_id: id }
    });
  }

  findAll() {
  return this.prisma.beeFamily.findMany({
    select: {
      beefamily_id: true,
      beefamily_number: true,
    }
  });
}
}