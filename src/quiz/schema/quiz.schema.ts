import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true })
export class Question {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true })
export class Quiz extends Document {
  @Prop({ required: true })
  quizName: string;

  @Prop()
  quizStart?: Date;

  @Prop()
  quizEnd?: Date;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];

  @Prop()
  get totalQuestions(): number {
    return this.questions.length;
  }
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
