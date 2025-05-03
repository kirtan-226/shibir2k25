import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { NityaVanchanService } from './nityavanchan.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NityaVanchan } from './schema/nityavanchan.schema';
import { CreateNityaVanchanDto, UpdateNityaVanchanDto } from './dto/nityavanchan.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Nitya Vanchan')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('nityavanchan')
export class NityaVanchanController {
  constructor(private readonly nityaVanchanService: NityaVanchanService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Nitya Vanchan entries' })
  findAll(): Promise<NityaVanchan[]> {
    return this.nityaVanchanService.findAll();
  }

  @Get('today')
  @ApiOperation({ summary: `Get today's Nitya Vanchan` })
  getToday(): Promise<NityaVanchan> {
    return this.nityaVanchanService.findByToday();
  }

  @Get('by-date')
  @ApiOperation({ summary: 'Get Nitya Vanchan by specific date (YYYY-MM-DD)' })
  getByDate(@Query('date') date: string): Promise<NityaVanchan> {
    return this.nityaVanchanService.findByDate(date);
  }

  @Post()
  @ApiOperation({ summary: 'Create a Nitya Vanchan entry' })
  create(@Body() createDto: CreateNityaVanchanDto): Promise<NityaVanchan> {
    return this.nityaVanchanService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Nitya Vanchan by ID' })
  findOne(@Param('id') id: string): Promise<NityaVanchan> {
    return this.nityaVanchanService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Nitya Vanchan entry' })
  update(@Param('id') id: string, @Body() updateDto: UpdateNityaVanchanDto): Promise<NityaVanchan> {
    return this.nityaVanchanService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Nitya Vanchan entry' })
  remove(@Param('id') id: string): Promise<NityaVanchan> {
    return this.nityaVanchanService.delete(id);
  }
}
