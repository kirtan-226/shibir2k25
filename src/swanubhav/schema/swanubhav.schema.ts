import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Swanubhav extends Document {
  @Prop({
    type: String,
    required: true,
  })
  swanubhavDetail: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const SwanubhavSchema = SchemaFactory.createForClass(Swanubhav);
