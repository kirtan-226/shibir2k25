import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(@InjectModel('FormEntry') private formModel: Model<any>) {}

  saveEntry(data: any): Promise<FormData> {
    const newEntry = new this.formModel(data);
    return newEntry.save();
  }
}
