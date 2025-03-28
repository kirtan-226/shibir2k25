import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns an array of users.', type: [User] })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by email' })
  @ApiParam({ name: 'email', example: 'john.doe@example.com', description: 'Email of the user' })
  @ApiResponse({ status: 200, description: 'Returns the user data.', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':email')
  async getOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}
