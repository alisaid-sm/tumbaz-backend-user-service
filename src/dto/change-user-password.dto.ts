import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class ChangeUserPasswordDto {
  @ApiProperty({
    example: 'password',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  @MaxLength(255, { message: 'Password maksimal 255 karakter' })
  password: string;

  @ApiProperty({
    example: 'password',
    description: 'Harus sama dengan field password',
  })
  @IsNotEmpty({ message: 'Konfirmasi password tidak boleh kosong' })
  @IsString()
  @Match('password', { message: 'Konfirmasi password tidak cocok' })
  confirm_password: string;
}
