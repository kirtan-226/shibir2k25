import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizService, JwtAuthGuard, RolesGuard],
  exports: [QuizService],
})
export class QuizModule {}
