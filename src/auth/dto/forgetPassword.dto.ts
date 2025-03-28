import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Registered email address to receive reset link',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'febwqbr8326tr82yburgy138781398173uhufhednjsvhdgfvsdbfghvaj',
    description: 'Reset token received via email',
  })
  @IsNotEmpty({ message: 'Token is required' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewPassword123', description: 'New password', minLength: 8 })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ example: 'NewPassword123', description: 'Confirm new password' })
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @IsString()
  passwordConfirm: string;
}
