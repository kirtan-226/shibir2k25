import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordResetEmail(email: string, firstName: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: 'passwordReset',
      context: {
        firstName,
        email,
        resetLink,
        expirationMinutes: 60,
        currentYear: new Date().getFullYear(),
      },
    });
  }
  catch(error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
