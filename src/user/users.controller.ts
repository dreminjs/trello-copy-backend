import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenJwtGuard } from 'src/auth/guards/token.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(TokenJwtGuard)
  @ApiOperation({ summary: 'получить одного пользователеля' })
  @Get(':userId')
  public async findOne(@Param('userId') userId: string): Promise<User> {
    return await this.userService.findOne({ id: userId });
  }

  @UseGuards(TokenJwtGuard)
  @ApiOperation({ summary: 'удалить одного пользователя' })
  @Delete(':userId')
  public async deleteOne(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteOne({ id: userId });
  }

  @UseGuards(TokenJwtGuard)
  @ApiOperation({ summary: 'обновить одного пользователя' })
  @Put(':userId')
  public async updateOne(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateOne({ id: userId }, { ...dto });
  }
}
