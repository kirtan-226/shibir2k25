import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizEntry, User } from './schema/user.schema';
import { Types } from 'mongoose';
import { QuizEntryDto, ResponseDto } from './dto/update-user-quiz.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAll(query: { mandalName?: string; gender?: string; role?: string }): Promise<User[]> {
    const filter: any = {};
    if (query.mandalName) filter.mandalName = query.mandalName;
    if (query.gender) filter.gender = query.gender;
    if (query.role) filter.role = query.role;

    return this.userModel.find(query).select('-__v');
  }

  async getOne(query: { id?: string; phoneNo?: string; shibirId?: string }): Promise<User> {
    const filter: any = {};
    if (query.id) filter._id = query.id;
    if (query.phoneNo) filter.phoneNo = query.phoneNo;
    if (query.shibirId) filter.shibirId = query.shibirId;

    const user = await this.userModel.findOne(filter).select('-__v');

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createOne(createUserDto: Partial<User>): Promise<User> {
    createUserDto.createdAt = new Date();
    createUserDto.updatedAt = new Date();

    if (createUserDto.mandalDetails)
      createUserDto.mandalDetails = new Types.ObjectId(createUserDto.mandalDetails);

    if (createUserDto.busDetails)
      createUserDto.busDetails.busId = new Types.ObjectId(createUserDto.busDetails.busId);

    return this.userModel.create(createUserDto);
  }

  async updateOne(
    query: { id?: string; shibirId?: string },
    updateUserDto: Partial<User>,
  ): Promise<User> {
    const filter: any = {};
    if (query.id) filter._id = query.id;
    if (query.shibirId) filter.shibirId = query.shibirId;

    updateUserDto.updatedAt = new Date();

    if (updateUserDto.mandalDetails)
      updateUserDto.mandalDetails = new Types.ObjectId(updateUserDto.mandalDetails);

    if (updateUserDto.busDetails)
      updateUserDto.busDetails.busId = new Types.ObjectId(updateUserDto.busDetails.busId);

    const user = await this.userModel
      .findOneAndUpdate(filter, updateUserDto, { new: true, runValidators: true })
      .select('-__v');

    if (!user) {
      throw new NotFoundException('User not found for update');
    }
    return user;
  }

  async deleteOne(query: { shibirId?: string }): Promise<{ message: string }> {
    const user = await this.userModel.findOneAndDelete(query);
    if (!user) {
      throw new NotFoundException('User not found for deletion');
    }
    return { message: 'User deleted successfully' };
  }

  private calculateQuizScore(responses: ResponseDto[]): number {
    return responses.reduce((score, response) => {
      return score + (response.isCorrect ? 1 : 0);
    }, 0);
  }

  private calculateTotalScore(quizzes: QuizEntry[]): number {
    return quizzes.reduce((totalScore, quiz) => totalScore + quiz.quizScore, 0);
  }

  private calculateTotalQuestions(quizzes: QuizEntry[]): number {
    return quizzes.reduce((totalQuestions, quiz) => totalQuestions + quiz.quizQuestions, 0);
  }

  // Submit Quiz
  async submitQuizResult(userId: string, quizData: QuizEntryDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create the new quiz entry
    const quizEntry = {
      quiz: new Types.ObjectId(quizData.quiz), // Ensure quiz ID is also a valid ObjectId
      responses: quizData.responses.map(res => ({
        question: new Types.ObjectId(res.question), // Convert string to ObjectId
        selectedAnswer: res.selectedAnswer,
        isCorrect: res.isCorrect,
      })),
      quizScore: this.calculateQuizScore(quizData.responses),
      quizQuestions: quizData.responses.length,
    };

    // Find if quiz entry already exists
    const existingQuizEntryIndex = user.quizDetails.quizzes.findIndex(
      entry => entry.quiz.toString() === quizData.quiz.toString(),
    );

    if (existingQuizEntryIndex >= 0) {
      // If entry exists, throw an error
      throw new Error('Quiz entry already exists. No update allowed for the same quiz ID.');
    } else {
      // If no entry exists, add a new quiz entry
      user.quizDetails.quizzes.push(quizEntry);
    }

    // Update total score, total questions, and Last Quiz Submission time
    user.quizDetails.totalScore = this.calculateTotalScore(user.quizDetails.quizzes);
    user.quizDetails.totalQuestions = this.calculateTotalQuestions(user.quizDetails.quizzes);
    user.quizDetails.lastQuizSubmittedAt = new Date();

    await user.save();
    return user;
  }

  // Review Quiz
  async reviewQuizResponses(userId: string, quizId: string) {
    // Fetch user by userId and get the quiz responses
    const user = await this.userModel.findById(userId).select('quizDetails');

    if (!user) {
      throw new Error('User not found');
    }

    const quiz = user.quizDetails.quizzes.find(q => q.quiz.toString() === quizId);

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Return quiz responses along with the score and questions count
    return quiz;
  }

  // Global Leaderboard
  async getGlobalLeaderboard() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.userModel.aggregate([
      {
        $match: {
          'quizDetails.totalScore': { $exists: true },
        },
      },
      {
        $lookup: {
          from: 'mandals',
          localField: 'mandalDetails',
          foreignField: '_id',
          as: 'mandalData',
        },
      },
      {
        $unwind: '$mandalData',
      },
      {
        $project: {
          _id: 1,
          shibirId: 1,
          firstName: 1,
          lastName: 1,
          mandalName: '$mandalData.mandalName',
          totalScore: '$quizDetails.totalScore',
          totalQuestions: '$quizDetails.totalQuestions',
          lastQuizSubmittedAt: '$quizDetails.lastQuizSubmittedAt',
        },
      },
      {
        $sort: {
          totalScore: -1,
          lastQuizSubmittedAt: 1,
        },
      },
      {
        $limit: 20,
      },
    ]);
  }
}
