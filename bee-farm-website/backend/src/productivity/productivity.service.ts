import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateProductivityDto } from '../auth/dto/update-productivity.dto';
import { CreateProductivityDto } from 'src/auth/dto/create-productivity.dto';

@Injectable()
export class ProductivityService {
  constructor(private readonly prisma: PrismaService) {}

async findAll() {
  const result = await this.prisma.productivity.findMany({
    include: {
      beefamily: true
    }
  });
  return result;
}


  async update(id: number, dto: UpdateProductivityDto) {
    return this.prisma.productivity.update({
      where: { productivity_id: id },
      data: dto,
    });
  }

  async create(dto: CreateProductivityDto) {
  return this.prisma.productivity.create({ data: dto });
}

async remove(id: number): Promise<void> {
  await this.prisma.productivity.delete({
    where: { productivity_id: id },
  });
}

}
