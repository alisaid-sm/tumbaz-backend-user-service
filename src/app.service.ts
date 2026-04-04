import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from './common/utils/handle-error.util';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    /*
    - check if email already exists in database
    - if exists, throw BadRequestException with message "Email already exists"
    - save user to database
    */
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException({
          message: ['Email already exists'],
          error: 'Bad Request',
          statusCode: 400,
        });
      }

      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return { message: 'User created successfully' };
    } catch (error) {
      handleError(error);
    }
  }

  async getUser(id: string) {
    try {
      /*
    - get user from database
    */
      const user = await this.userRepository.findOne({
        select: [
          'id',
          'email',
          'first_name',
          'last_name',
          'address',
          'phone_number',
        ],
        where: { id },
      });

      if (!user) {
        throw new BadRequestException({
          message: ['User not found'],
          error: 'Not Found',
          statusCode: 404,
        });
      }

      return { message: 'User fetched successfully', data: user };
    } catch (error) {
      handleError(error);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      /*
    - update user in database
    */
      const user = await this.userRepository.findOne({
        select: ['id'],
        where: { id },
      });

      if (!user) {
        throw new BadRequestException({
          message: ['User not found'],
          error: 'Not Found',
          statusCode: 404,
        });
      }

      const result = await this.userRepository.update(id, updateUserDto);

      return { message: 'User updated successfully', data: result };
    } catch (error) {
      handleError(error);
    }
  }

  async deleteUser(id: string) {
    try {
      /*
    - delete user from database
    */
      const user = await this.userRepository.findOne({
        select: ['id'],
        where: { id },
      });

      if (!user) {
        throw new BadRequestException({
          message: ['User not found'],
          error: 'Not Found',
          statusCode: 404,
        });
      }

      const result = await this.userRepository.delete(id);

      return { message: 'User deleted successfully', data: result };
    } catch (error) {
      handleError(error);
    }
  }

  async listUser() {
    try {
      /*
    - list users from database
    */
      const users = await this.userRepository.find({
        select: [
          'id',
          'email',
          'first_name',
          'last_name',
          'address',
          'phone_number',
        ],
      });

      return { message: 'User list fetched successfully', data: users };
    } catch (error) {
      handleError(error);
    }
  }

  async changeUserPassword(
    id: string,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    try {
      /*
    - change user password in database
    */
      const user = await this.userRepository.findOne({
        select: ['id'],
        where: { id },
      });

      if (!user) {
        throw new BadRequestException({
          message: ['User not found'],
          error: 'Not Found',
          statusCode: 404,
        });
      }

      const result = await this.userRepository.update(id, {
        password: changeUserPasswordDto.password,
      });

      return { message: 'User password changed successfully', data: result };
    } catch (error) {
      handleError(error);
    }
  }
}
