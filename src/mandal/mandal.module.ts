import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MandalService } from './mandal.service';
import { MandalController } from './mandal.controller';
import { Mandal, MandalSchema } from './schema/mandal.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mandal.name, schema: MandalSchema }])],
  controllers: [MandalController],
  providers: [MandalService, JwtAuthGuard, RolesGuard],
  exports: [MandalService],
})
export class MandalModule {}
