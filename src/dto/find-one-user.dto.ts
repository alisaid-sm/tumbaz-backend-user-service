import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneUserDto {
  @ApiProperty({
    example: '',
    description: 'ID pengguna dalam format UUID',
  })
  @IsUUID()
  id: string;
}
