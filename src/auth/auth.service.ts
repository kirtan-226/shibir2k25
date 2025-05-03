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
import { ForgetPasswordDto, ResetPasswordDto } from './dto/forgetPassword.dto';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Helper function to create jwt token and send object containing user data with jwt token
  private async createTokenAndSendUser(user: User) {
    const token = this.jwtService.sign({ id: user._id });

    // Fetch user again, select fields, and return plain object directly
    const userToSend = await this.userModel.findById(user._id).select('-__v').lean();

    return {
      token,
      ...userToSend,
    };
  }

  async signup(signupDto: SignupDto) {
    signupDto.password = '12345678';

    const {
      shibirId,
      firstName,
      lastName,
      gender,
      phoneNo,
      emergencyPhoneNo,
      roles,
      medicalDetails,
      password,
    } = signupDto;

    // const existingUser = await this.userModel.findOne({ phoneNo });
    // if (existingUser) {
    //   throw new ConflictException('User with this phone number already exists!!');
    // }

    // if (phoneNo === emergencyPhoneNo) {
    //   throw new ConflictException('Phone number and Emergency Phone number must be different!!');
    // }

    // // Helper function to generate Shibir ID based on gender
    // const generateShibirId = async (gender: string): Promise<string> => {
    //   // Determine prefix based on gender
    //   const prefix = gender.toLowerCase() === 'male' ? 'BHYK' : 'BHYT';

    //   // Find the last user with the same prefix
    //   const lastUser = await this.userModel
    //     .findOne({ shibirId: { $regex: `^${prefix}` } })
    //     .sort({ shibirId: -1 })
    //     .limit(1);

    //   // If no previous user, start with 001
    //   if (!lastUser) {
    //     return `${prefix}001`;
    //   }

    //   // Extract the number and increment
    //   const lastNumber = parseInt(lastUser.shibirId.replace(prefix, ''));
    //   const newNumber = lastNumber + 1;

    //   // Pad the number with zeros to maintain 3-digit format
    //   return `${prefix}${newNumber.toString().padStart(3, '0')}`;
    // };

    // // Generate Shibir ID
    // const shibirId = await generateShibirId(gender);

    const newUser = await this.userModel.create({
      shibirId,
      firstName,
      lastName,
      gender,
      phoneNo,
      emergencyPhoneNo,
      roles,
      medicalDetails,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.createTokenAndSendUser(newUser);
  }

  async login(loginDto: LoginDto) {
    const { shibirId, password } = loginDto;

    // Check If Shibir ID and password are entered
    if (!shibirId || !password) {
      throw new UnauthorizedException('Please provide Shibir ID and password');
    }

    // Check If user exists and password is correct
    const existingUser = await this.userModel
      .findOne({
        shibirId: shibirId.trim().toUpperCase(),
      })
      .select('+password');

    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      throw new UnauthorizedException('Invalid Shibir ID or password');
    }

    return this.createTokenAndSendUser(existingUser);
  }

  async forgetPassword(
    forgetPasswordDto: ForgetPasswordDto,
    req: Request,
  ): Promise<{ message: string; resetLink: string }> {
    // Find user by shibirID and phoneNo
    const user = await this.userModel.findOne({
      $and: [
        {
          shibirId: forgetPasswordDto.shibirId,
        },
        {
          phoneNo: forgetPasswordDto.phoneNo,
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate reset token
    const passwordResetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send reset link with token
    const resetLink = `${req.protocol}://${req.get('host')}/resetPassword/${passwordResetToken}`;

    return {
      message: 'Password reset link has been created',
      resetLink,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const hashedToken = crypto.createHash('sha256').update(resetPasswordDto.token).digest('hex');

    // Find user with matching token and not expired
    const user = await this.userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (resetPasswordDto.password !== resetPasswordDto.passwordConfirm) {
      throw new ConflictException('Passwords are not same!!');
    }

    // Update user password and clear reset token
    user.password = resetPasswordDto.password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.passwordChangedAt = new Date(Date.now() - 1000);
    await user.save({ validateBeforeSave: false });

    await this.userModel.findByIdAndUpdate({ _id: user._id }, user);

    return {
      message: 'Password has been successfully reset. Login again...',
    };
  }
}
