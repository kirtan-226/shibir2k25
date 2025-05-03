import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Gungrahan extends Document {
  @Prop({
    type: String,
    required: true,
  })
  prasangDetail: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  mentionTo: Types.ObjectId;
}

export const GungrahanSchema = SchemaFactory.createForClass(Gungrahan);
