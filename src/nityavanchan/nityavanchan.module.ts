import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NityaVanchanService } from './nityavanchan.service';
import { NityaVanchanController } from './nityavanchan.controller';
import { NityaVanchan, NityaVanchanSchema } from './schema/nityavanchan.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: NityaVanchan.name, schema: NityaVanchanSchema }])],
  controllers: [NityaVanchanController],
  providers: [NityaVanchanService, JwtAuthGuard, RolesGuard],
  exports: [NityaVanchanService],
})
export class NityaVanchanModule {}
