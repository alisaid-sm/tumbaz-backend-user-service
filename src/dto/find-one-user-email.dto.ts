import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindOneUserEmailDto {
  @ApiProperty({
    example: '',
    description: 'Email pengguna',
  })
  @IsEmail()
  email: string;
}
