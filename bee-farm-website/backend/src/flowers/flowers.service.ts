import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFlowerDto } from '../auth/dto/create-flower.dto';
import { UpdateFlowerDto } from '../auth/dto/update-flower.dto';

@Injectable()
export class FlowersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.malliferousPlant.findMany();
  }

  create(data: CreateFlowerDto) {
    return this.prisma.malliferousPlant.create({ data });
  }

  update(id: number, data: UpdateFlowerDto) {
    return this.prisma.malliferousPlant.update({
      where: { plant_id: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.malliferousPlant.delete({
      where: { plant_id: id },
    });
  }
}
