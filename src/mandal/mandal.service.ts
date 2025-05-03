import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mandal } from './schema/mandal.schema';
import { CreateMandalDto, UpdateMandalDto } from './dto/mandal.dto';

@Injectable()
export class MandalService {
  constructor(@InjectModel(Mandal.name) private mandalModel: Model<Mandal>) {}

  async findAll(): Promise<Mandal[]> {
    return this.mandalModel
      .find()
      .populate('mandalSanchalak', 'firstName lastName phoneNo')
      .populate('nirikshak', 'firstName lastName phoneNo')
      .exec();
  }

  async createOne(createMandalDto: CreateMandalDto): Promise<Mandal> {
    const newMandal = new this.mandalModel(createMandalDto);
    return newMandal.save();
  }

  async findOne(id: string): Promise<Mandal> {
    const mandal = await this.mandalModel
      .findById(id)
      .populate('mandalSanchalak', 'firstName lastName phoneNo')
      .populate('nirikshak', 'firstName lastName phoneNo')
      .exec();

    if (!mandal) {
      throw new NotFoundException('Mandal not found.');
    }

    return mandal;
  }

  async updateOne(id: string, updateMandalDto: UpdateMandalDto): Promise<Mandal> {
    const updatedMandal = await this.mandalModel
      .findByIdAndUpdate(id, updateMandalDto, { new: true })
      .populate('mandalSanchalak', 'firstName lastName phoneNo')
      .populate('nirikshak', 'firstName lastName phoneNo')
      .exec();

    if (!updatedMandal) {
      throw new NotFoundException('Mandal not found.');
    }

    return updatedMandal;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    const deletedMandal = await this.mandalModel.findByIdAndDelete(id).exec();

    if (!deletedMandal) {
      throw new NotFoundException('Mandal not found.');
    }

    return { message: 'Mandal deleted successfully' };
  }
}
