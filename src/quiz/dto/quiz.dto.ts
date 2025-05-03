import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({ example: 'What is the birth year of Lord Swaminarayan?' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ example: ['1780', '1781', '1782', '1783'] })
  @IsNotEmpty()
  @IsArray()
  options: string[];

  @ApiProperty({ example: '1781' })
  @IsNotEmpty()
  @IsString()
  correctAnswer: string;
}

export class UpdateQuestionDto {
  @ApiProperty({ example: 'What is the birth year of Lord Swaminarayan?' })
  @IsString()
  question?: string;

  @ApiProperty({ example: ['1780', '1781', '1782', '1783'] })
  @IsArray()
  options?: string[];

  @ApiProperty({ example: '1781' })
  @IsString()
  correctAnswer?: string;
}

export class CreateQuizDto {
  @ApiProperty({ example: 'Shreeji' })
  @IsNotEmpty()
  @IsString()
  quizName: string;

  @ApiProperty({ example: '2025-03-31T20:31:51.289Z', required: false })
  @IsOptional()
  @IsDateString()
  quizStart?: Date;

  @ApiProperty({ example: '2025-03-31T20:31:51.289Z', required: false })
  @IsOptional()
  @IsDateString()
  quizEnd?: Date;

  @ApiProperty({ type: [QuestionDto], required: false })
  @IsOptional()
  @IsArray()
  questions?: QuestionDto[];
}

export class UpdateQuizDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  quizName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  quizStart?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  quizEnd?: Date;
}
