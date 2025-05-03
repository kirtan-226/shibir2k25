import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NityaVanchan } from './schema/nityavanchan.schema';
import { CreateNityaVanchanDto, UpdateNityaVanchanDto } from './dto/nityavanchan.dto';

@Injectable()
export class NityaVanchanService {
  constructor(
    @InjectModel(NityaVanchan.name)
    private readonly nityaVanchanModel: Model<NityaVanchan>,
  ) {}

  async create(dto: CreateNityaVanchanDto): Promise<NityaVanchan> {
    const created = new this.nityaVanchanModel(dto);
    return created.save();
  }

  async findAll(): Promise<NityaVanchan[]> {
    return this.nityaVanchanModel.find().exec();
  }

  async findById(id: string): Promise<NityaVanchan> {
    const found = await this.nityaVanchanModel.findById(id).exec();
    if (!found) throw new NotFoundException('Entry not found');
    return found;
  }

  async findByToday(): Promise<NityaVanchan> {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const result = await this.nityaVanchanModel.findOne({
      dateToShow: { $gte: start, $lte: end },
    });

    if (!result) throw new NotFoundException('No entry found for today');
    return result;
  }

  async findByDate(date: string): Promise<NityaVanchan> {
    const targetDate = new Date(date);
    const start = new Date(targetDate.setHours(0, 0, 0, 0));
    const end = new Date(targetDate.setHours(23, 59, 59, 999));

    const result = await this.nityaVanchanModel.findOne({
      dateToShow: { $gte: start, $lte: end },
    });

    if (!result) throw new NotFoundException(`No entry found for ${date}`);
    return result;
  }

  async update(id: string, dto: UpdateNityaVanchanDto): Promise<NityaVanchan> {
    const updated = await this.nityaVanchanModel.findByIdAndUpdate(id, dto, { new: true }).exec();

    if (!updated) throw new NotFoundException('Entry not found');
    return updated;
  }

  async delete(id: string): Promise<NityaVanchan> {
    const deleted = await this.nityaVanchanModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Entry not found');
    return deleted;
  }
}
