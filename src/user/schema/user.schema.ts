import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'SH12345', description: 'Unique Shibir ID assigned to the user.' })
  @Prop({ required: true })
  shibirId: string;

  @ApiProperty({ example: 'John', description: 'First name of the user.' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user.' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: 'Male', description: 'Gender of the user.' })
  @Prop({ required: true })
  gender: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Unique email address of the user.',
  })
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.]+[a-zA-Z]{2,5}$/g,
  })
  email: string;

  @ApiProperty({ example: '********', description: 'Hashed password of the user.', minLength: 8 })
  @Prop({ required: true, minlength: 8, select: false })
  password: string;

  @ApiProperty({ example: '********', description: 'Password confirmation.', required: false })
  @Prop({ required: false, select: false })
  passwordConfirm: string;

  @ApiProperty({
    example: 'randomResetToken123',
    description: 'Token used for resetting password.',
    required: false,
  })
  @Prop({ required: false, select: false })
  passwordResetToken: string;

  @ApiProperty({
    example: '2025-03-26T10:00:00.000Z',
    description: 'Expiration date for the reset token.',
    required: false,
  })
  @Prop({ required: false, select: false })
  passwordResetExpires: Date;

  @ApiProperty({
    example: '2025-03-20T10:00:00.000Z',
    description: 'Timestamp when the password was last changed.',
    required: false,
  })
  @Prop({ required: false, select: false })
  passwordChangedAt: Date;

  @ApiProperty({
    example: '2025-03-15T10:00:00.000Z',
    description: 'Timestamp when the user was created.',
    required: false,
  })
  @Prop({ select: false })
  createdAt: Date;

  @ApiProperty({
    example: '2025-03-25T10:00:00.000Z',
    description: 'Timestamp when the user was last updated.',
    required: false,
  })
  @Prop({ select: false })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
