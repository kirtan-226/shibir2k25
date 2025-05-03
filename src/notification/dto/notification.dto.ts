import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Notification Title',
    type: String,
    example: 'Important update regarding Gondal Utara',
  })
  @IsNotEmpty()
  @IsString()
  notificationTitle: string;

  @ApiProperty({
    description: 'Notification Body',
    type: String,
    example: 'Utara of following yuvak has been shifted to Pramukh Hall',
  })
  @IsNotEmpty()
  @IsString()
  notificationBody: string;
}

export class UpdateNotificationDto {
  @ApiProperty({
    description: 'Notification Title',
    type: String,
    example: 'Important update regarding Gondal Utara',
    required: false,
  })
  @IsOptional()
  @IsString()
  notificationTitle?: string;

  @ApiProperty({
    description: 'Notification Body',
    type: String,
    example: 'Utara of following yuvak has been shifted to Pramukh Hall',
    required: false,
  })
  @IsOptional()
  @IsString()
  notificationBody?: string;
}
