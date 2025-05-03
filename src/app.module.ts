import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MandalModule } from './mandal/mandal.module';
import { GungrahanModule } from './gungrahan/gungrahan.module';
import { NotificationModule } from './notification/notification.module';
import { QuizModule } from './quiz/quiz.module';
import { NityaVanchanModule } from './nityavanchan/nityavanchan.module';
import { FormModule } from './form/form.module';
import { SwanubhavModule } from './swanubhav/swanubhav.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_TEST_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MandalModule,
    GungrahanModule,
    NotificationModule,
    QuizModule,
    NityaVanchanModule,
    FormModule,
    SwanubhavModule,
  ],
})
export class AppModule {}
