import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TitleTextDto {
  @ApiProperty({ example: 'Vachanamrut Gadhada I-1', description: 'Title of the section' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This Vachanamrut explains...', description: 'Content text' })
  @IsString()
  text: string;
}

export class CreateNityaVanchanDto {
  @ApiProperty({
    description: 'Date on which this document should be shown (YYYY-MM-DD)',
    example: '2025-04-08',
  })
  @IsDateString()
  dateToShow: string;

  @ApiProperty({ description: 'Vachanamrut details', type: TitleTextDto })
  @ValidateNested()
  @Type(() => TitleTextDto)
  vachanamrut: TitleTextDto;

  @ApiProperty({
    description: 'Array of 5 Swami ni Vaato',
    isArray: true,
    example: [
      'Satsang ma rahevu e moti vaat chhe.',
      'Bhagwan na mahima ma dradhata chhe.',
      'Aatma darshan thi mukti male chhe.',
      'Sadhu na ashirvad thi jivan sudhare chhe.',
      'Bhagwan ni seva karta thavu joie.',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  swamiNiVato: string[];

  @ApiProperty({ description: 'Jivan Charitra details', type: TitleTextDto })
  @ValidateNested()
  @Type(() => TitleTextDto)
  jivanCharitra: TitleTextDto;

  @ApiProperty({
    description: 'YouTube link of video prasang',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsString()
  videoPrasang: string;
}

export class UpdateNityaVanchanDto {
  @ApiProperty({
    description: 'Date on which this document should be shown (YYYY-MM-DD)',
    example: '2025-04-08',
  })
  @IsDateString()
  dateToShow?: string;

  @ApiProperty({ description: 'Vachanamrut details', type: TitleTextDto })
  @ValidateNested()
  @Type(() => TitleTextDto)
  vachanamrut?: TitleTextDto;

  @ApiProperty({
    description: 'Array of 5 Swami ni Vaato',
    isArray: true,
    example: [
      'Satsang ma rahevu e moti vaat chhe.',
      'Bhagwan na mahima ma dradhata chhe.',
      'Aatma darshan thi mukti male chhe.',
      'Sadhu na ashirvad thi jivan sudhare chhe.',
      'Bhagwan ni seva karta thavu joie.',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  swamiNiVato?: string[];

  @ApiProperty({ description: 'Jivan Charitra details', type: TitleTextDto })
  @ValidateNested()
  @Type(() => TitleTextDto)
  jivanCharitra?: TitleTextDto;

  @ApiProperty({
    description: 'YouTube link of video prasang',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsString()
  videoPrasang?: string;
}
