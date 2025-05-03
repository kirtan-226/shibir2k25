import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateMandalDto {
  @ApiProperty({ example: 'Manas Nagar', description: 'Name of the Mandal' })
  @IsString()
  @IsNotEmpty()
  mandalName: string;

  @ApiProperty({ example: 'MN', description: 'Initials of the Mandal' })
  @IsString()
  @IsNotEmpty()
  mandalInitial: string;

  @ApiProperty({ example: 'Bharuch', description: 'Name of the Xetra' })
  @IsString()
  @IsNotEmpty()
  xetraName: string;

  @ApiProperty({ example: '5c8a1d5b0190b214360dc057', description: 'User ID of Mandal Sanchalak' })
  @IsMongoId()
  @IsNotEmpty()
  mandalSanchalak: string;

  @ApiProperty({ example: '5c8a1d5b0190b214360dc057', description: 'User ID of Nirikshak' })
  @IsMongoId()
  @IsNotEmpty()
  nirikshak: string;
}

export class UpdateMandalDto {
  @ApiProperty({ example: '5c8a1d5b0190b214360dc057', required: false })
  @IsMongoId()
  mandalSanchalak?: string;

  @ApiProperty({ example: '5c8a1d5b0190b214360dc057', required: false })
  @IsMongoId()
  nirikshak?: string;
}
