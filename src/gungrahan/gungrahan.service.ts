import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGungrahanDto, UpdateGungrahanDto } from './dto/gungrahan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gungrahan } from './schema/gungrahan.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class GungrahanService {
  constructor(@InjectModel(Gungrahan.name) private gungrahanModel: Model<Gungrahan>) {}

  async create(createGungrahanDto: CreateGungrahanDto): Promise<Gungrahan> {
    // Convert string IDs to ObjectIds
    const gungrahanData = {
      ...createGungrahanDto,
      createdBy: new Types.ObjectId(createGungrahanDto.createdBy),
      mentionTo: new Types.ObjectId(createGungrahanDto.mentionTo),
    };

    const createdGungrahan = new this.gungrahanModel(gungrahanData);
    return createdGungrahan.save();
  }

  async findAll(): Promise<Gungrahan[]> {
    return this.gungrahanModel.find().exec();
  }

  async findOne(id: string): Promise<Gungrahan> {
    const gungrahan = await this.gungrahanModel.findById(id).exec();
    if (!gungrahan) {
      throw new NotFoundException(`Gungrahan with ID ${id} not found`);
    }

    return gungrahan;
  }

  async findByCreator(creatorId: Types.ObjectId): Promise<Gungrahan[]> {
    return this.gungrahanModel.find({ createdBy: creatorId }).exec();
  }

  async findByMentionedUser(userId: Types.ObjectId): Promise<Gungrahan[]> {
    return this.gungrahanModel.find({ mentionTo: userId }).exec();
  }

  async update(id: string, updateGungrahanDto: UpdateGungrahanDto): Promise<Gungrahan> {
    // Convert mentionTo to ObjectId if provided
    const updateData = { ...updateGungrahanDto };
    if (updateData.mentionTo) {
      updateData.mentionTo = new Types.ObjectId(updateData.mentionTo);
    }

    const updatedGungrahan = await this.gungrahanModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedGungrahan) {
      throw new NotFoundException(`Gungrahan with ID ${id} not found`);
    }

    return updatedGungrahan;
  }
  async remove(id: string): Promise<Gungrahan> {
    const deletedGungrahan = await this.gungrahanModel.findByIdAndDelete(id).exec();

    if (!deletedGungrahan) {
      throw new NotFoundException(`Gungrahan with ID ${id} not found`);
    }

    return deletedGungrahan;
  }
}
