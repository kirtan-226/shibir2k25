import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsArray, IsOptional, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class SignupDto {
  @ApiProperty({ example: 'MNYK001', description: 'Unique Shibir ID assigned to the user' })
  @IsNotEmpty({ message: 'Shibir ID is required' })
  @IsString()
  shibirId: string;

  @ApiProperty({ example: 'Saurabh', description: 'First name of the user' })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Panchal', description: 'Last name of the user' })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Male', description: 'Gender of the user', enum: ['Male', 'Female'] })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsString()
  gender: string;

  @ApiProperty({ example: '9876543210', description: 'Indian phone number' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  phoneNo: string;

  @ApiProperty({ example: '8765432109', description: 'Emergency phone number' })
  @IsNotEmpty({ message: 'Emergency phone number is required' })
  @IsString()
  emergencyPhoneNo: string;

  @ApiProperty({
    description: 'Roles assigned to the user',
    enum: [
      'yuvak',
      'yuvati',
      'bus-leader',
      'utara-leader',
      'attendence-taker',
      'mandal-sanchalak',
      'nirikshak',
      'nirdeshak',
      'admin',
    ],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty({
    message: 'Roles are required',
  })
  @IsEnum(
    [
      'yuvak',
      'yuvati',
      'bus-leader',
      'utara-leader',
      'attendence-taker',
      'mandal-sanchalak',
      'nirikshak',
      'nirdeshak',
      'admin',
    ],
    { each: true, message: 'Invalid role' },
  )
  roles: string[];

  @ApiProperty({ description: 'Reference to the Mandal' })
  @IsOptional()
  mandalDetails?: Types.ObjectId;

  @ApiProperty({ description: 'Reference to the Bus' })
  @IsOptional()
  busDetails?: Types.ObjectId;

  @ApiProperty({ description: 'List of Utaras assigned to the user', type: [String] })
  @IsOptional()
  utaraDetails?: Types.ObjectId[];

  @ApiProperty({ description: 'Medical details of the user' })
  @IsNotEmpty({ message: 'Medical details are required' })
  medicalDetails: {
    bloodGroup: string;
    illness?: string | null;
  };

  @ApiProperty({ example: 'StrongPass123', description: 'User password', minLength: 8 })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
