import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './schema/quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  async getQuizById(quizId: number) {
    const quiz = await this.quizModel.findOne({ quizId }).exec();
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async submitQuiz(shibirId: string, quizId: number, answers: any[]) {
    const quiz = await this.quizModel.findOne({ quizId }).exec();
    if (!quiz) throw new NotFoundException('Quiz not found');

    let score = 0;
    quiz.quizQuestions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.questionId);
      if (userAnswer && userAnswer.selectedOption === question.correctOption) {
        score++;
      }
    });

    return {
      shibirId,
      quizId,
      currentScore: score * 25,
      total: 100,
    };
  }

  async getQuizScore(shibirId: string) {
    return {
      currentScore: 50,
      total: 100,
      quiz: [
        {
          quizId: 1,
          quizName: 'Shreeji',
          score: 1,
          total: 4,
        },
      ],
    };
  }

  async addQuizQuestion(data: any) {
    const quiz = await this.quizModel.findOne({ quizId: data.quizId }).exec();
    if (!quiz) throw new NotFoundException('Quiz not found');

    const newQuestion = {
      questionId: quiz.quizQuestions.length + 1,
      question: data.question,
      optionA: data.option1,
      optionB: data.option2,
      optionC: data.option3,
      optionD: data.option4,
      correctOption: data.correctOption,
    };

    quiz.quizQuestions.push(newQuestion);
    await quiz.save();
    return { message: 'Question added successfully' };
  }

  async getQuizNames() {
    return [
      { quizId: 1, quizName: 'Shreeji', helpingName: 'Day-1 Bharuch' },
      { quizId: 2, quizName: 'Gunatit', helpingName: 'Day-2 Gondal' },
      { quizId: 3, quizName: 'Pragji', helpingName: 'Day-3 Gondal' },
    ];
  }
}
