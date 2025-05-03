import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({
    example: 'MNYK001 or MNYT001',
    description: 'Unique Shibir ID assigned to the user',
  })
  @IsNotEmpty({ message: 'Shibir ID is required' })
  @IsString()
  shibirId: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Indian phone number',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  phoneNo: string;
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
