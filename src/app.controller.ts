import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { FindOneUserEmailDto } from './dto/find-one-user-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Get('/user/:id')
  getUser(@Param() params: FindOneUserDto) {
    return this.appService.getUser(params.id);
  }

  @Get('/user/:email/identity')
  getUserByEmail(@Param() params: FindOneUserEmailDto) {
    return this.appService.getUserByEmail(params.email);
  }

  @Patch('/user/:id')
  updateUser(
    @Param() params: FindOneUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.appService.updateUser(params.id, updateUserDto);
  }

  @Delete('/user/:id')
  deleteUser(@Param() params: FindOneUserDto) {
    return this.appService.deleteUser(params.id);
  }

  @Get('/user')
  listUser() {
    return this.appService.listUser();
  }

  @Post('/user/:id/change-password')
  changeUserPassword(
    @Param() params: FindOneUserDto,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    return this.appService.changeUserPassword(params.id, changeUserPasswordDto);
  }
}
