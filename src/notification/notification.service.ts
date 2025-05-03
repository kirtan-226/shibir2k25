// notification.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { Notification } from './schema/notification.schema';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  async createOne(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = new this.notificationModel(createNotificationDto);
    return newNotification.save();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const updatedNotification = await this.notificationModel
      .findByIdAndUpdate(id, updateNotificationDto, { new: true })
      .exec();

    if (!updatedNotification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return updatedNotification;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.notificationModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return { deleted: true, message: 'Notification successfully deleted' };
  }
}
