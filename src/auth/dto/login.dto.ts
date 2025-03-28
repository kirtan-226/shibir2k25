import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Registered email address of the user',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.]+[a-zA-Z]{2,5}$/g, { message: 'Invalid email format' })
  email: string;

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
