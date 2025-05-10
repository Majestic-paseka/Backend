import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from '../auth/dto/create-flower.dto';
import { UpdateFlowerDto } from '../auth/dto/update-flower.dto';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  findAll() {
    return this.flowersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateFlowerDto) {
    return this.flowersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFlowerDto) {
    return this.flowersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      console.log('Удаляется ID:', id);
    return this.flowersService.remove(+id);
  }
}
