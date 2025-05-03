// notification.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { handleError } from 'src/common/handler';

@ApiTags('Notification')
@Controller('notification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Get all notifications' })
  @Get()
  @Roles('admin')
  async findAll() {
    try {
      const data = await this.notificationService.findAll();
      return {
        message: 'Notifications fetched successfully',
        data,
        status: true,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @ApiOperation({ summary: 'Create a new notification' })
  @Roles('admin')
  @Post()
  async createOne(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      const data = await this.notificationService.createOne(createNotificationDto);
      return {
        message: 'Notification submitted successfully',
        data,
        status: true,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @ApiOperation({ summary: 'Get a notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.notificationService.findOne(id);
      return {
        message: 'Notification fetched successfully',
        data,
        status: true,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @ApiOperation({ summary: 'Update a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    try {
      const data = await this.notificationService.update(id, updateNotificationDto);
      return {
        message: 'Notification updated successfully',
        data,
        status: true,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.notificationService.remove(id);
      return {
        message: 'Notification deleted successfully',
        data,
        status: true,
      };
    } catch (error) {
      handleError(error);
    }
  }
}
