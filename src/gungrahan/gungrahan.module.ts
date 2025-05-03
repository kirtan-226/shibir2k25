import { Module } from '@nestjs/common';
import { GungrahanService } from './gungrahan.service';
import { GungrahanController } from './gungrahan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gungrahan, GungrahanSchema } from './schema/gungrahan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gungrahan.name, schema: GungrahanSchema }])],
  controllers: [GungrahanController],
  providers: [GungrahanService],
})
export class GungrahanModule {}
