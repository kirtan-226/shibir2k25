import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GungrahanService } from './gungrahan.service';
import { CreateGungrahanDto, UpdateGungrahanDto } from './dto/gungrahan.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { handleError } from 'src/common/handler';

@ApiTags('Gun Grahan')
@Controller('gungrahan')
// Uncomment if you want to use auth guard for all routes
// @UseGuards(JwtAuthGuard)
export class GungrahanController {
  constructor(private readonly gungrahanService: GungrahanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Gungrahan' })
  async create(@Body() createGungrahanDto: CreateGungrahanDto) {
    try {
      const data = await this.gungrahanService.create(createGungrahanDto);
      return {
        message: 'Created Gungrahan successfully',
        data,
        status: true,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all Gungrahans' })
  async findAll() {
    return await this.gungrahanService.findAll();
  }

  @Get('creator/:creatorId')
  @ApiOperation({ summary: 'Get Gungrahans by creator ID' })
  @ApiParam({ name: 'creatorId', type: String })
  async findByCreator(@Param('creatorId') creatorId: Types.ObjectId) {
    return await this.gungrahanService.findByCreator(creatorId);
  }

  @Get('mention/:userId')
  @ApiOperation({ summary: 'Get Gungrahans by mentioned user ID' })
  @ApiParam({ name: 'userId', type: String })
  async findByMentionedUser(@Param('userId') userId: Types.ObjectId) {
    return await this.gungrahanService.findByMentionedUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Gungrahan by ID' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string) {
    return await this.gungrahanService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Gungrahan' })
  @ApiParam({ name: 'id', type: String })
  async update(@Param('id') id: string, @Body() updateGungrahanDto: UpdateGungrahanDto) {
    return await this.gungrahanService.update(id, updateGungrahanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Gungrahan' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id') id: string) {
    return await this.gungrahanService.remove(id);
  }
}
