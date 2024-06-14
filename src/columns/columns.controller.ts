import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CurrentUser } from '../user/currentUser.decorator';
import { Column, User } from '@prisma/client';
import { CreateColumnDto } from './dto/create-column.dto';
import { EditColumnDto } from './dto/edit-column.dto';
import { ColumnOwnerGuard } from './guards/ColumnOwner.guard';
import { TokenJwtGuard } from 'src/auth/guards/token.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({summary:"Создание колонки"})
  @UseGuards(TokenJwtGuard)
  @Post()
  public async create(
    @CurrentUser() { id: userId }: User,
    @Body() { title }: CreateColumnDto,
  ): Promise<Column> {
    return await this.columnsService.create(title, userId);
  }

  @ApiOperation({summary:"Получение всех колонок определенного пользователя"})
  @UseGuards(ColumnOwnerGuard)
  @Get()
  public async findMany(
    @CurrentUser() { id: userId }: User,
  ): Promise<Column[]> {
    return await this.columnsService.findMany({ userId });
  }

  @ApiOperation({summary:"Получение одной колонки"})
  @UseGuards(TokenJwtGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Column> {
    return await this.columnsService.findOne({ id });
  }

  @ApiOperation({summary:"Удаление одной колонки"})
  @UseGuards(ColumnOwnerGuard)
  @Delete(':id')
  public async deleteOne(@Param('id') id: string): Promise<void> {
    await this.columnsService.deleteOne({ id });
  }


  @ApiOperation({summary:"Редактирование заголовка колонки"})
  @UseGuards(ColumnOwnerGuard)
  @Put(':id')
  public async updateOne(
    @Param(':id') id: string,
    @Body() { title }: EditColumnDto,
  ): Promise<Column> {
    return await this.columnsService.updateOne({ id }, { title });
  }
}
