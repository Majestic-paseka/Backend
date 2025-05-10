import { Controller, Get, UseGuards } from '@nestjs/common';
import { Put, Param, ParseIntPipe, Body, Post, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductivityService } from './productivity.service';
import { UpdateProductivityDto } from '../auth/dto/update-productivity.dto';
import { CreateProductivityDto } from 'src/auth/dto/create-productivity.dto';

@Controller('productivity')
@UseGuards(JwtAuthGuard)
export class ProductivityController {
  constructor(private readonly productivityService: ProductivityService) {}

  @Get()
  async findAll() {
    return this.productivityService.findAll();
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductivityDto
  ) {
    return this.productivityService.update(id, dto);
  }

  @Post()
  create(@Body() dto: CreateProductivityDto) {
    return this.productivityService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productivityService.remove(+id);
  }


}
