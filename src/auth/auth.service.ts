import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { Request } from 'express';
import { ResetPasswordDto } from './dto/forgetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { firstName, lastName, email, gender, password, passwordConfirm } = signupDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists!!');
    }

    if (password !== passwordConfirm) {
      throw new ConflictException('Passwords are not same!!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: to generate shibirId based on mandal name and registration number
    const shibirId = `BHYK0002`;

    const newUser = await this.userModel.create({
      shibirId,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      gender,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const token = this.jwtService.sign({ id: newUser._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // 1) Check If email and password entered
    if (!email || !password) {
      throw new UnauthorizedException(`Please provide email and password`);
    }

    // 2) Check If user exist or password is correct
    const existingUser = await this.userModel.findOne({ email }).select('+password');
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      throw new UnauthorizedException('Invalid email or password!!');
    }

    const token = this.jwtService.sign({ id: existingUser._id });

    return { token };
  }

  async forgetPassword(email: string, req: Request): Promise<{ message: string }> {
    // Find user by email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate reset token
    const passwordResetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token and expiry to user
    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;

    await this.userModel.findByIdAndUpdate({ _id: user._id }, user);

    // Send reset email
    const resetLink = `${req.protocol}://${req.get('host')}/resetPassword/${passwordResetToken}`;
    await this.mailService.sendPasswordResetEmail(user.email, user.firstName, resetLink);

    return {
      message: 'Password reset link has been sent to your email',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    // Find user with matching token and not expired
    const user = await this.userModel.findOne({
      passwordResetToken: resetPasswordDto.token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (resetPasswordDto.password !== resetPasswordDto.passwordConfirm) {
      throw new ConflictException('Passwords are not same!!');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);

    // Update user password and clear reset token
    user.set({
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
      passwordChangedAt: new Date(Date.now() - 1000),
    });

    await this.userModel.findByIdAndUpdate({ _id: user._id }, user);

    return {
      message: 'Password has been successfully reset',
    };
  }
}
