import { Controller, Get, Post, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { MandalService } from './mandal.service';
import { CreateMandalDto, UpdateMandalDto } from './dto/mandal.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Mandals')
@Controller('mandals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MandalController {
  constructor(private readonly mandalService: MandalService) {}

  @ApiOperation({ summary: 'Get all mandals' })
  @Get()
  @Roles('admin')
  async findAll() {
    return this.mandalService.findAll();
  }

  @ApiOperation({ summary: 'Create a new mandal' })
  @Post('create-mandal')
  @Roles('admin')
  async createOne(@Body() createMandalDto: CreateMandalDto) {
    return this.mandalService.createOne(createMandalDto);
  }

  @ApiOperation({ summary: 'Get a mandal by ID' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'Mandal ID' })
  @Get('get-mandal/:id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return this.mandalService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a mandal by ID' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'Mandal ID' })
  @Patch('update-mandal/:id')
  @Roles('admin')
  async updateOne(@Param('id') id: string, @Body() updateMandalDto: UpdateMandalDto) {
    return this.mandalService.updateOne(id, updateMandalDto);
  }

  @ApiOperation({ summary: 'Delete a mandal by ID' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'Mandal ID' })
  @Delete('delete-mandal/:id')
  @Roles('admin')
  async deleteOne(@Param('id') id: string) {
    return this.mandalService.deleteOne(id);
  }
}
