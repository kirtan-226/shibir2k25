import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'MNYK001 or MNYT001',
    description: 'Unique Shibir ID assigned to the user',
  })
  @IsNotEmpty({ message: 'Shibir ID is required' })
  @IsString()
  shibirId: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'User password',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
