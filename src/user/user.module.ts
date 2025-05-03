import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, RolesGuard],
  exports: [UserService],
})
export class UserModule {}
