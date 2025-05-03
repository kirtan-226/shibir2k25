import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { QuizEntryDto } from './dto/update-user-quiz.dto';

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // View All User -- filter by mandalName, gender or role
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'id', required: false, example: '67eb011ddc8cadbdeed8c5d3' })
  @ApiQuery({ name: 'phoneNo', required: false, example: '9320930242' })
  @ApiQuery({ name: 'shibirId', required: false, example: 'MNYK001' })
  @ApiResponse({ status: 200, description: 'Returns an array of users.', type: [User] })
  @Roles('admin', 'nirdeshak')
  @Get()
  async getAllUsers(
    @Query() query: { mandalName?: string; gender?: string; role?: string },
  ): Promise<User[]> {
    return this.userService.findAll(query);
  }

  // View User -- filter by object id, phoneNo, or shibirId
  @ApiOperation({ summary: 'Find user by id, phoneNo, or shibirId' })
  @ApiQuery({ name: 'id', required: false, example: '67eb011ddc8cadbdeed8c5d3' })
  @ApiQuery({ name: 'phoneNo', required: false, example: '9320930242' })
  @ApiQuery({ name: 'shibirId', required: false, example: 'MNYK001' })
  @ApiResponse({ status: 200, description: 'Returns the user data.', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Roles('admin', 'nirdeshak', 'nirikshak', 'mandal-sanchalak', 'bus-leader', 'utara-leader')
  @Get('get-user')
  async findOne(@Query() query: { id?: string; phoneNo?: string; shibirId?: string }) {
    return this.userService.getOne(query);
  }

  // Create User
  @ApiOperation({ summary: 'Create a new user' })
  @Roles('admin', 'nirdeshak', 'nirikshak', 'mandal-sanchalak')
  @Post('create-user')
  async createUser(@Body() createUserDto: Partial<User>): Promise<User> {
    return this.userService.createOne(createUserDto);
  }

  // Update User
  @ApiOperation({ summary: 'Update user by shibirId' })
  @Roles('admin', 'nirdeshak', 'nirikshak', 'mandal-sanchalak')
  @Patch('update-user')
  async updateUser(
    @Query() query: { id?: string; shibirId?: string },
    @Body() updateUserDto: Partial<User>,
  ) {
    return this.userService.updateOne(query, updateUserDto);
  }

  // Delete User
  @ApiOperation({ summary: 'Delete a user by shibirId' })
  @Roles('admin', 'nirdeshak', 'nirikshak', 'mandal-sanchalak')
  @Delete('delete-user')
  async deleteUser(@Query() query: { shibirId?: string }) {
    return this.userService.deleteOne(query);
  }

  // Submit Quiz Result of User
  @Patch(':id/submit-quiz')
  @ApiOperation({ summary: 'Submit Quiz' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: QuizEntryDto })
  async addQuizResult(@Param('id') userId: string, @Body() quizData: QuizEntryDto) {
    return this.userService.submitQuizResult(userId, quizData);
  }

  // Review Quiz
  @ApiOperation({ summary: 'Review Quiz' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'quizId', description: 'Quiz ID' })
  @Get(':userId/review-quiz/:quizId')
  async reviewQuiz(@Param('userId') userId: string, @Param('quizId') quizId: string) {
    return await this.userService.reviewQuizResponses(userId, quizId);
  }

  // Get Global Leaderboard
  @Get('global-leaderboard')
  @ApiOperation({ summary: 'Get Global Leaderboard' })
  async getGlobalLeaderboard() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.userService.getGlobalLeaderboard();
  }
}
