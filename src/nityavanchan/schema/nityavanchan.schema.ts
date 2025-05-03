import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class TitleText {
  @ApiProperty({ example: 'Vachanamrut Gadhada I-1', description: 'Title of the section' })
  title: string;

  @ApiProperty({
    example: 'In this Vachanamrut, Bhagwan Swaminarayan discusses...',
    description: 'Content text',
  })
  text: string;
}

@Schema()
export class NityaVanchan extends Document {
  @ApiProperty({
    description: 'Date on which this document should be shown (YYYY-MM-DD)',
    example: '2025-04-08',
  })
  @Prop({ type: Date, required: true, unique: true })
  dateToShow: Date;

  @ApiProperty({
    description: 'Vachanamrut details',
    type: TitleText,
  })
  @Prop({
    type: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
    _id: false, // This disables automatic _id generation for this subdocument
  })
  vachanamrut: TitleText;

  @ApiProperty({
    description: 'Array of 5 Swami ni Vaato',
    isArray: true,
    example: [
      'Satsang ma rahevu e moti vaat chhe.',
      'Bhagwan na mahima ma dradhata chhe.',
      'Aatma darshan thi mukti male chhe.',
      'Sadhu na ashirvad thi jivan sudhare chhe.',
      'Bhagwan ni seva karta thavu joie.',
    ],
  })
  @Prop({
    required: true,
    type: [String],
  })
  swamiNiVato: string[];

  @ApiProperty({
    description: 'Jivan Charitra details',
    type: TitleText,
  })
  @Prop({
    type: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
    _id: false, // This disables automatic _id generation for this subdocument
  })
  jivanCharitra: TitleText;

  @ApiProperty({
    description: 'YouTube link of video prasang',
    example: 'https://www.youtube.com/embed/zPezpI1ps1Q?si=-u2FE0aBKzbvv2i-',
  })
  @Prop({ type: String, required: true })
  videoPrasang: string;
}

export const NityaVanchanSchema = SchemaFactory.createForClass(NityaVanchan);
