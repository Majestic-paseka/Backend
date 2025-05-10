import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductivityDto {
  @IsOptional()
  @IsNumber()
  productivity_year?: number;

  @IsOptional()
  @IsNumber()
  honey_kg?: number;

  @IsOptional()
  @IsNumber()
  wax_kg?: number;
}
