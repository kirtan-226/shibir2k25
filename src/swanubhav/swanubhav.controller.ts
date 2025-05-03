import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwanubhavService } from './swanubhav.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSwanubhavDto, UpdateSwanubhavDto } from './dto/swanubhav.dto';

@ApiTags('Swanubhav')
@Controller('swanubhav')
export class SwanubhavController {
  constructor(private readonly swanubhavService: SwanubhavService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Swanubhav' })
  @ApiResponse({ status: 201, description: 'Swanubhav created successfully' })
  create(@Body() createSwanubhavDto: CreateSwanubhavDto) {
    return this.swanubhavService.createOne(createSwanubhavDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Swanubhavs' })
  @ApiResponse({ status: 200, description: 'List of Swanubhavs' })
  findAll() {
    return this.swanubhavService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single Swanubhav by ID' })
  @ApiResponse({ status: 200, description: 'Single Swanubhav data' })
  findOne(@Param('id') id: string) {
    return this.swanubhavService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Swanubhav by ID' })
  @ApiResponse({ status: 200, description: 'Swanubhav updated successfully' })
  update(@Param('id') id: string, @Body() updateSwanubhavDto: UpdateSwanubhavDto) {
    return this.swanubhavService.updateOne(id, updateSwanubhavDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Swanubhav by ID' })
  @ApiResponse({ status: 200, description: 'Swanubhav deleted successfully' })
  remove(@Param('id') id: string) {
    return this.swanubhavService.deleteOne(id);
  }
}
