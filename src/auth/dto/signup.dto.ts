import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'SHB12345',
    description: 'Unique Shibir ID assigned to the user',
  })
  @IsNotEmpty({ message: 'Shibir ID is required' })
  @IsString()
  shibirId: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender of the user',
    enum: ['Male', 'Female', 'Other'],
  })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsString()
  gender: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
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

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Confirm password (should match the password field)',
  })
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @IsString()
  passwordConfirm: string;
}
