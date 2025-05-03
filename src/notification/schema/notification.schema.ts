import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @ApiProperty({
    description: 'Notification Title',
    type: String,
    example: 'Important update regarding Gondal Utara',
  })
  @Prop({
    type: String,
    required: true,
  })
  notificationTitle: string;

  @ApiProperty({
    description: 'Notification Body',
    type: String,
    example: 'Utara of following yuvak has been shifted to Pramukh Hall',
  })
  @Prop({
    type: String,
    required: true,
  })
  notificationBody: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
