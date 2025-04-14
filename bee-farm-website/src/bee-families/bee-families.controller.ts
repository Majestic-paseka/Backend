import { Controller, Post, Get, Body } from '@nestjs/common';
import { BeeFamiliesService } from './bee-families.service';

@Controller('bee-families')
export class BeeFamiliesController {
  constructor(private readonly familiesService: BeeFamiliesService) {}

  // Добавление новой пчелосемьи (без авторизации)
  @Post()
  createFamily(
    @Body() data: {
      user_id: number; // Теперь явно передаём user_id
      beefamily_number: string;
      queen_birth_year?: number;
      mother_family?: string;
      queen_breed?: string;
      queen_line?: string;
    },
  ) {
    return this.familiesService.createFamily(data.user_id, data);
  }

  // Получение списка пчелосемей (без авторизации)
  @Get()
  getFamilies(@Body('user_id') userId: number) {
    return this.familiesService.getFamilies(userId);
  }
}