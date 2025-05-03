import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Schema()
export class QuizResponse {
  @Prop({ type: Types.ObjectId, ref: 'Question' })
  question: Types.ObjectId;

  @Prop({ required: true })
  selectedAnswer: string;

  @Prop({ required: true })
  isCorrect: boolean;
}

@Schema()
export class QuizEntry {
  @Prop({ type: Types.ObjectId, ref: 'Quiz' })
  quiz: Types.ObjectId;

  @Prop({
    type: [QuizResponse],
    default: [],
    _id: false, // This disables automatic _id generation for this subdocument
  })
  responses: QuizResponse[];

  @Prop({ required: true })
  quizScore: number;

  @Prop({ required: true })
  quizQuestions: number;
}

@Schema()
export class QuizDetails {
  @Prop({ default: 0 })
  totalScore: number;

  @Prop({ default: 0 })
  totalQuestions: number;

  @Prop({ type: Date })
  lastQuizSubmittedAt: Date;

  @Prop({
    type: [QuizEntry],
    default: [],
    _id: false, // This disables automatic _id generation for this subdocument
  })
  quizzes: QuizEntry[];
}
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User extends Document {
  @ApiProperty({
    example: 'MNYK001',
    description: 'Unique Shibir ID assigned to the user.',
  })
  @Prop({ type: String, required: true, unique: true })
  shibirId: string;

  @ApiProperty({
    example: 'Saurabh',
    description: 'First name of the user.',
  })
  @Prop({ type: String, required: true })
  firstName: string;

  @ApiProperty({
    example: 'Panchal',
    description: 'Last name of the user.',
  })
  @Prop({ type: String, required: true })
  lastName: string;

  @ApiProperty({
    example: 'male/female',
    description: 'Gender of the user.',
  })
  @Prop({ type: String, required: true })
  gender: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Unique phone number of the user',
  })
  @Prop({
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        // Regex for Indian phone numbers:
        // - Starts with 9, 8, 7, or 6 (1st digit)
        // - Followed by 9 digit
        const indianPhoneRegex = /^[6-9]\d{9}$/;
        return indianPhoneRegex.test(v);
      },
      message: props => `${props.value} is not a valid Indian phone number!`,
    },
  })
  phoneNo: string;

  @ApiProperty({
    example: '8765432109',
    description: 'Emergency phone number of the user',
  })
  @Prop({
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        // Regex for Indian phone numbers:
        // - Starts with 9, 8, 7, or 6 (1st digit)
        // - Followed by 9 digit
        const indianPhoneRegex = /^[6-9]\d{9}$/;
        return indianPhoneRegex.test(v);
      },
      message: props => `${props.value} is not a valid Indian phone number!`,
    },
  })
  emergencyPhoneNo: string;

  @ApiProperty({
    description: 'Roles assigned to the user',
    enum: [
      'yuvak',
      'yuvati',
      'bus-leader',
      'utara-leader',
      'attendence-taker',
      'mandal-sanchalak',
      'nirikshak',
      'nirdeshak',
      'admin',
    ],
    isArray: true,
  })
  @Prop({
    required: true,
    type: [String],
    enum: [
      'yuvak',
      'yuvati',
      'bus-leader',
      'utara-leader',
      'attendence-taker',
      'mandal-sanchalak',
      'nirikshak',
      'nirdeshak',
      'admin',
    ],
  })
  roles: string[];

  @ApiProperty({ description: 'Reference to the Mandal' })
  @Prop({ type: Types.ObjectId, ref: 'Mandal' })
  mandalDetails: Types.ObjectId;

  @ApiProperty({
    description: 'Bus details including ID and Seat No',
    type: () => Object,
  })
  @Prop({
    type: {
      busId: { type: Types.ObjectId, ref: 'Bus', required: true },
      busSeatNo: { type: Number, required: true },
    },
    _id: false,
  })
  busDetails: {
    busId: Types.ObjectId;
    busSeatNo: number;
  };

  @ApiProperty({
    description: 'List of Utaras assigned to the user',
    type: [Object],
  })
  @Prop({
    type: [
      {
        location: { type: String, required: true },
        room: { type: String, required: true },
      },
    ],
    _id: false,
  })
  utaraDetails: Array<{
    location: string;
    room: string;
  }>;

  @ApiProperty({
    description: 'Medical details of the user',
    type: () => Object,
  })
  @Prop({
    type: {
      bloodGroup: { type: String, required: true },
      illness: { type: String, default: null },
    },
    _id: false, // This disables automatic _id generation for this subdocument
  })
  medicalDetails: {
    bloodGroup: string;
    illness: string | null;
  };

  @Prop({
    type: QuizDetails,
    default: {},
    _id: false, // This disables automatic _id generation for this subdocument
  })
  quizDetails: QuizDetails;

  @ApiProperty({
    example: '********',
    description: 'Hashed password of the user.',
    minLength: 8,
  })
  @Prop({ type: String, required: true, minlength: 8, select: false })
  password: string;

  @ApiProperty({
    example: 'fpowerouqksmxnjszknsiqouerhewirwefoddfwenefefwe',
    description: 'Token used for resetting password.',
    required: false,
  })
  @Prop({ type: String, required: false, select: false })
  passwordResetToken: string | null;

  @ApiProperty({
    example: '2025-03-26T10:00:00.000Z',
    description: 'Expiration date for the reset token.',
    required: false,
  })
  @Prop({ type: Date, required: false, select: false })
  passwordResetExpires: Date | null;

  @ApiProperty({
    example: '2025-03-20T10:00:00.000Z',
    description: 'Timestamp when the password was last changed.',
    required: false,
  })
  @Prop({ type: Date, required: false, select: false })
  passwordChangedAt: Date;

  @ApiProperty({
    example: '2025-03-15T10:00:00.000Z',
    description: 'Timestamp when the user was created.',
    required: false,
  })
  @Prop({ type: Date, required: false, select: false })
  createdAt: Date;

  @ApiProperty({
    example: '2025-03-25T10:00:00.000Z',
    description: 'Timestamp when the user was last updated.',
    required: false,
  })
  @Prop({ type: Date, required: false, select: false })
  updatedAt: Date;

  createPasswordResetToken: () => string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Method to create password reset token
UserSchema.methods.createPasswordResetToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash it and set to passwordResetToken field
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expiration time (e.g., 10 minutes from now)
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken; // This plain token will be sent to user
};

// Hash password before saving
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 16);
  next();
});

// Middleware to automatically populate referenced fields
const autoPopulate = function (next) {
  this.populate([
    { path: 'mandalDetails', select: '-__v' },
    { path: 'busDetails', select: '-__v' },
    { path: 'utaraDetails', select: '-__v' },
  ]);
  next();
};

// Apply the middleware to queries
UserSchema.pre('find', autoPopulate);
UserSchema.pre('findOne', autoPopulate);
UserSchema.pre('findOneAndUpdate', autoPopulate);
