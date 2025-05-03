import { Module } from '@nestjs/common';
import { SwanubhavService } from './swanubhav.service';
import { SwanubhavController } from './swanubhav.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Swanubhav, SwanubhavSchema } from './schema/swanubhav.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Swanubhav.name, schema: SwanubhavSchema }])],
  controllers: [SwanubhavController],
  providers: [SwanubhavService],
})
export class SwanubhavModule {}
