import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz details by ID' })
  @ApiResponse({ status: 200, description: 'Returns the quiz details' })
  async getQuiz(@Param('id') id: string) {
    return this.quizService.getQuizById(Number(id));
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        shibirId: { type: 'string' },
        quizId: { type: 'number' },
        answers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              questionId: { type: 'number' },
              selectedOption: { type: 'string' },
            },
          },
        },
      },
    },
  })
  async submitQuiz(@Body() body: { shibirId: string; quizId: number; answers: any[] }) {
    return this.quizService.submitQuiz(body.shibirId, body.quizId, body.answers);
  }

  @Get('score/:shibirId')
  @ApiOperation({ summary: 'Get quiz score' })
  @ApiResponse({ status: 200, description: 'Returns the quiz score' })
  async getQuizScore(@Param('shibirId') shibirId: string) {
    return this.quizService.getQuizScore(shibirId);
  }

  @Post('question')
  @ApiOperation({ summary: 'Add new quiz question' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quizId: { type: 'number' },
        question: { type: 'string' },
        option1: { type: 'string' },
        option2: { type: 'string' },
        option3: { type: 'string' },
        option4: { type: 'string' },
        correctOption: { type: 'string' },
      },
    },
  })
  async addQuizQuestion(@Body() body: any) {
    return this.quizService.addQuizQuestion(body);
  }

  @Get('names')
  @ApiOperation({ summary: 'Get quiz names' })
  async getQuizNames() {
    return this.quizService.getQuizNames();
  }
}
