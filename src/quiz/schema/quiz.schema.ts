import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quiz extends Document {
  @Prop({ required: true })
  quizId: number;

  @Prop({ required: true })
  quizTitle: string;

  @Prop({ required: true })
  questionCount: number;

  @Prop({
    type: [
      {
        questionId: Number,
        question: String,
        optionA: String,
        optionB: String,
        optionC: String,
        optionD: String,
        correctOption: String, // Store the correct answer
      },
    ],
  })
  quizQuestions: any[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
