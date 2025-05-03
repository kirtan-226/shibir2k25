import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema()
export class Mandal extends Document {
  @ApiProperty({
    description: 'Name of the Mandal',
    type: String,
    example: 'Manas Nagar',
  })
  @Prop({
    type: String,
    required: true,
  })
  mandalName: string;

  @ApiProperty({
    description: 'Initials of the Mandal',
    type: String,
    example: 'MN',
  })
  @Prop({
    type: String,
    required: true,
  })
  mandalInitial: string;

  @ApiProperty({
    description: 'Name of the xetra',
    type: String,
    example: 'Bharuch',
  })
  @Prop({
    type: String,
    required: true,
  })
  xetraName: string;

  @ApiProperty({
    description: 'User ID of the Mandal Sanchalak',
    type: String,
    example: '5c8a1d5b0190b214360dc057',
  })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  mandalSanchalak: Types.ObjectId;

  @ApiProperty({
    description: 'User ID of the Nirikshak',
    type: String,
    example: '5c8a1d5b0190b214360dc057',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  nirikshak: Types.ObjectId;
}

export const MandalSchema = SchemaFactory.createForClass(Mandal);
