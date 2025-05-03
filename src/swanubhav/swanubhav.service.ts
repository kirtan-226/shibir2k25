import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Swanubhav } from './schema/swanubhav.schema';
import { CreateSwanubhavDto, UpdateSwanubhavDto } from './dto/swanubhav.dto';

@Injectable()
export class SwanubhavService {
  constructor(@InjectModel(Swanubhav.name) private readonly swanubhavModel: Model<Swanubhav>) {}

  async createOne(createSwanubhavDto: CreateSwanubhavDto): Promise<Swanubhav> {
    createSwanubhavDto.createdBy = new Types.ObjectId(createSwanubhavDto.createdBy);
    const swanubhav = new this.swanubhavModel(createSwanubhavDto);
    return swanubhav.save();
  }

  async findAll(): Promise<Swanubhav[]> {
    return this.swanubhavModel.find().populate('createdBy').exec();
  }

  async findOne(id: string): Promise<Swanubhav> {
    const swanubhav = await this.swanubhavModel.findById(id).populate('createdBy').exec();
    if (!swanubhav) {
      throw new NotFoundException(`Swanubhav with ID ${id} not found`);
    }
    return swanubhav;
  }

  async updateOne(id: string, updateSwanubhavDto: UpdateSwanubhavDto): Promise<Swanubhav> {
    const updated = await this.swanubhavModel
      .findByIdAndUpdate(id, updateSwanubhavDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Swanubhav with ID ${id} not found`);
    }
    return updated;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    const deleted = await this.swanubhavModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Swanubhav with ID ${id} not found`);
    }
    return { message: 'Swanubhav deleted successfully' };
  }
}
