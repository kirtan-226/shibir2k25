import { Types } from 'mongoose';

export class ResponseDto {
  question: Types.ObjectId;
  selectedAnswer: string;
  isCorrect: boolean;
}

export class QuizEntryDto {
  quiz: Types.ObjectId;
  responses: ResponseDto[];
}
