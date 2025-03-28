// import { Module } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import * as path from 'path';
// import { MailService } from './mail.service';

// @Module({
//   imports: [
//     MailerModule.forRoot({
//       transport: {
//         service: 'gmail',
//         auth: {
//           user: process.env.GMAIL_USERNAME,
//           pass: process.env.GMAIL_PASSWORD,
//         },
//       },
//       defaults: {
//         from: process.env.EMAIL_FROM,
//       },
//       template: {
//         dir: path.join(process.cwd(), 'src', 'mail', 'templates'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//   ],
//   providers: [MailService],
//   exports: [MailService],
// })
// export class MailModule {}

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('GMAIL_USERNAME');
        const password = configService.get<string>('GMAIL_PASSWORD');

        // console.log('GMAIL_USERNAME:', username);
        // console.log('GMAIL_PASSWORD:', password ? 'Loaded' : 'Not Loaded');

        return {
          transport: {
            service: 'gmail',
            auth: {
              user: username,
              pass: password,
            },
          },
          defaults: {
            from: configService.get<string>('EMAIL_FROM'),
          },
          template: {
            dir: path.join(process.cwd(), 'src', 'mail', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
