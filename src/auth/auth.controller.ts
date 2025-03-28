import { Controller, Body, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto, ResetPasswordDto } from './dto/forgetPassword.dto';
import { Request } from 'express';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Signup',
    description: 'Registers a new user and returns an authentication token.',
  })
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    schema: { example: { token: 'jwt-token' } },
  })
  @ApiResponse({ status: 400, description: 'Bad request - Validation errors.' })
  signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticates a user and returns a JWT token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    schema: { example: { token: 'jwt-token' } },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials.' })
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('forgetPassword')
  @ApiOperation({
    summary: 'Forgot Password',
    description: `Sends a password reset link to the user's email.`,
  })
  @ApiBody({ type: ForgetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset email sent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Email not found.' })
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto, @Req() req: Request) {
    return this.authService.forgetPassword(forgetPasswordDto.email, req);
  }

  @Post('resetPassword')
  @ApiOperation({
    summary: 'Reset Password',
    description: `Resets the user's password using the token sent via email.`,
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully reset.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid token or expired link.' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
