import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quiz } from './schema/quiz.schema';
import { CreateQuizDto, UpdateQuizDto, UpdateQuestionDto, QuestionDto } from './dto/quiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  async getAllQuizzes(): Promise<any[]> {
    return this.quizModel.find().select('-questions -__v').lean().exec();
  }

  async getQuiz(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id);
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new this.quizModel(createQuizDto);
    return quiz.save();
  }

  async updateQuiz(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const updated = await this.quizModel.findByIdAndUpdate(id, updateQuizDto, { new: true });
    if (!updated) throw new NotFoundException('Quiz not found');
    return updated;
  }

  async insertQuestion(quizId: string, createQuestionDto: QuestionDto): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) throw new NotFoundException('Quiz not found');

    quiz.questions.push({
      question: createQuestionDto.question,
      options: createQuestionDto.options,
      correctAnswer: createQuestionDto.correctAnswer,
    });

    return quiz.save();
  }

  async updateQuestion(
    quizId: string,
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) throw new NotFoundException('Quiz not found');

    const questionObjectId = new Types.ObjectId(questionId);
    const question = quiz.questions.find(q => q._id && q._id.equals(questionObjectId));

    if (!question)
      throw new NotFoundException(`Question with ID ${questionId} not found in quiz ${quizId}`);

    if (updateQuestionDto.question !== undefined) question.question = updateQuestionDto.question;
    if (updateQuestionDto.options !== undefined) question.options = updateQuestionDto.options;
    if (updateQuestionDto.correctAnswer !== undefined)
      question.correctAnswer = updateQuestionDto.correctAnswer;

    return quiz.save();
  }
}
