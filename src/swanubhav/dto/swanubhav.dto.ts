import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSwanubhavDto {
  @ApiProperty({
    description: 'Details of the Swanubhav',
    type: String,
    example: 'Experienced deep peace during meditation',
  })
  @IsString()
  @IsNotEmpty()
  swanubhavDetail: string;

  @ApiProperty({
    description: 'User ID of the Creator',
    type: String,
    example: '5c8a1d5b0190b214360dc057',
  })
  @IsMongoId()
  @IsNotEmpty()
  createdBy: Types.ObjectId;
}

export class UpdateSwanubhavDto {
  @ApiProperty({
    description: 'Updated details of the Swanubhav',
    type: String,
    example: 'Felt a deeper spiritual connection after satsang',
  })
  swanubhavDetail?: string;
}
