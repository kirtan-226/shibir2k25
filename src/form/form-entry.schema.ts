import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const FormSchema = new Schema(
  {
    shibirId: String,
    firstName: String,
    lastName: String,
    gender: String,
    phoneNo: String,
    emergencyPhoneNo: String,
    roles: {
      type: [String],
      required: true,
    },
    bloodGroup: String,
    illness: String,
    password: String,
    mandal: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users',
  },
);

FormSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const form: any = this;

  if (!form.isModified('password')) {
    return next();
  }

  try {
    form.password = await bcrypt.hash(form.password, 16); // 16 salt rounds
    next();
  } catch (error) {
    next(error);
  }
});
