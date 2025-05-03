import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateGungrahanDto {
  @ApiProperty({
    description: 'Gungrahan Prasang',
    type: String,
    example: '@Monank Patel, Has gun of simplicity',
  })
  @IsString()
  @IsNotEmpty()
  prasangDetail: string;

  @ApiProperty({
    description: 'User ID of the Creator',
    type: String,
    example: '5c8a1d5b0190b214360dc057',
  })
  @IsMongoId()
  @IsNotEmpty()
  createdBy: Types.ObjectId;

  @ApiProperty({
    description: 'User ID of Mentioned User',
    type: String,
    example: '5c8a1d5b0190b214360dc057',
  })
  @IsMongoId()
  @IsNotEmpty()
  mentionTo: Types.ObjectId;
}

export class UpdateGungrahanDto {
  @ApiProperty({
    description: 'Gungrahan Prasang',
    type: String,
    example: '@Monank Patel, Has gun of simplicity',
  })
  @IsString()
  @IsNotEmpty()
  prasangDetail?: string;

  @ApiProperty({
    description: 'User ID of Mentioned User',
    type: String,
    example: '5c8a1d5b0190b214360dc057',
  })
  @IsMongoId()
  mentionTo?: Types.ObjectId;
}

export class GungrahanResponseDto {
  @ApiProperty({
    example: '6073a37fc8358b3f9c7d3512',
  })
  _id: string;

  @ApiProperty({
    description: 'Gungrahan Prasang',
    example: '@Monank Patel, Has gun of simplicity',
  })
  prasangDetail: string;

  @ApiProperty({
    description: 'User ID of the Creator',
    example: '5c8a1d5b0190b214360dc057',
  })
  createdBy: Types.ObjectId;

  @ApiProperty({
    description: 'User ID of Mentioned User',
    example: '5c8a1d5b0190b214360dc057',
  })
  mentionTo: Types.ObjectId;
}
