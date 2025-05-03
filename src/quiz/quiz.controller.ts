import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto, UpdateQuestionDto, QuestionDto } from './dto/quiz.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Quiz')
@Controller('quiz')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Get all Quiz
  @Get()
  @ApiOperation({ summary: 'Get all quizzes (without questions)' })
  // @Roles('admin') // or public, depending on access
  async getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  // Get Quiz
  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  getQuiz(@Param('id') id: string) {
    return this.quizService.getQuiz(id);
  }

  // Create Quiz
  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @Roles('admin')
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  // Update Quiz
  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Quiz ID' })
  @ApiBody({ type: UpdateQuizDto, description: 'Fields to update in quiz' })
  @Roles('admin')
  updateQuiz(@Param('id') quizId: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz(quizId, updateQuizDto);
  }

  // Start Quiz
  @Patch(':id/startQuiz')
  @ApiOperation({ summary: 'Start a quiz 10 mins after Date.now' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @Roles('admin')
  startQuiz(@Param('id') quizId: string) {
    const now = new Date();
    const quizStart = new Date(now.getTime() + 10 * 60000); // 10 minutes later
    return this.quizService.updateQuiz(quizId, { quizStart });
  }

  // End Quiz
  @Patch(':id/endQuiz')
  @ApiOperation({ summary: 'End a quiz 10 mins after Date.now' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @Roles('admin')
  endQuiz(@Param('id') quizId: string) {
    const now = new Date();
    const quizEnd = new Date(now.getTime() + 10 * 60000); // 10 minutes later
    return this.quizService.updateQuiz(quizId, { quizEnd });
  }

  // Create Question
  @Post(':id/question')
  @ApiOperation({ summary: 'Insert a new question into an existing quiz' })
  @ApiParam({ name: 'id', description: 'Quiz ID' })
  @Roles('admin')
  async insertQuestion(@Param('id') quizId: string, @Body() createQuestionDto: QuestionDto) {
    return this.quizService.insertQuestion(quizId, createQuestionDto);
  }

  // Update Question
  @Patch(':id/question/:questionId')
  @ApiOperation({ summary: 'Update a question inside a quiz' })
  @ApiParam({ name: 'quizId', type: String, description: 'Quiz ID' })
  @ApiParam({ name: 'questionId', type: String, description: 'Question ID' })
  @ApiBody({ type: UpdateQuestionDto, description: 'Fields to update in question' })
  @Roles('admin')
  updateQuestion(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.quizService.updateQuestion(id, questionId, updateQuestionDto);
  }
}
