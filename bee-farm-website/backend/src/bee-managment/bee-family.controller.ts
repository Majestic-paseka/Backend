import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BeeFamilyService } from './bee-family.service';

@Controller('beefamilies')
@UseGuards(JwtAuthGuard)
export class BeeFamilyController {
  constructor(private readonly beeFamilyService: BeeFamilyService) {}

  @Get()
  findAllForUser(@Req() req) {
    return this.beeFamilyService.findAllByUser(req.user.id);
  }

  @Post()
  create(@Req() req, @Body() dto) {
    return this.beeFamilyService.create(req.user.id, dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto) {
    return this.beeFamilyService.update(Number(id), dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.beeFamilyService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.beeFamilyService.delete(Number(id));
  }
}
