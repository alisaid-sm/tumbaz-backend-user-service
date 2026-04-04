import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'johndoe@example.com',
    description: 'Alamat email pengguna',
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(255, { message: 'Email maksimal 255 karakter' })
  email: string;

  @ApiPropertyOptional({
    example: 'John',
    description: 'Nama depan pengguna',
    maxLength: 100,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'First name tidak boleh kosong' })
  @IsString()
  @MaxLength(100, { message: 'First name maksimal 100 karakter' })
  first_name: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Nama belakang pengguna',
    maxLength: 100,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Last name tidak boleh kosong' })
  @IsString()
  @MaxLength(100, { message: 'Last name maksimal 100 karakter' })
  last_name: string;

  @ApiPropertyOptional({
    example: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
    description: 'Alamat lengkap pengguna (opsional)',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '08123456789',
    description: 'Nomor telepon pengguna format Indonesia (opsional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Matches(/^(\+62|62|0)[0-9]{8,13}$/, {
    message: 'Format nomor telepon tidak valid (contoh: 08123456789)',
  })
  @MaxLength(20, { message: 'Nomor telepon maksimal 20 karakter' })
  phone_number?: string;
}
