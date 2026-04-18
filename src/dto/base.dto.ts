import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  page?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  limit?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  order_by?: string;
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  order_type?: 'asc' | 'desc';
}
