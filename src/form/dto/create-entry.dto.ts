import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEnum,
  IsArray,
  IsOptional,
  IsMongoId,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class MedicalDetailsDto {
  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

  @IsOptional()
  @IsString()
  illness?: string;
}

export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty()
  shibirId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  emergencyPhoneNo: string;

  @IsArray()
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
    { each: true },
  )
  roles: string[];

  @IsOptional()
  @IsMongoId()
  mandalDetails?: string;

  @IsOptional()
  @IsMongoId()
  busDetails?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  utaraDetails?: string[];

  @ValidateNested()
  @Type(() => MedicalDetailsDto)
  medicalDetails: MedicalDetailsDto;

  @IsString()
  @MinLength(8)
  password: string;
}
