import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Card, User } from '@prisma/client';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
import { TokenJwtGuard } from 'src/auth/guards/token.guard';
import { ChangeStatusCardDto, UpdateCardDto } from './dto/update-card.dto';
import { CardOwnerGuard } from './guards/CardOwner.guard';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChangeColumnQueryParams } from './dto/ChangeColumnQueryParams.dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

 
  @ApiOperation({ summary: 'Создать карточку' })
  @UseGuards(TokenJwtGuard)
  @Post()
  public async create(
    @Body() dto: CreateCardDto,
    @CurrentUser() { id: userId }: User,
  ): Promise<Card> {
    return await this.cardsService.create({ ...dto, userId });
  }

  @ApiOperation({ summary: 'Получить все карточки определенной колонки' })
  @Get(':columnId')
  public async findMany(@Param('columnId') columnId: string): Promise<Card[]> {
    return await this.cardsService.findMany({ columnId });
  }
  
  @ApiOperation({ summary: 'Изменить содержание кароточки' })
  @UseGuards(CardOwnerGuard)
  @Put(':id')
  public async updateOne(
    @Body() { text }: UpdateCardDto,
    @Param('id') id: string,
  ): Promise<Card> {
    return await this.cardsService.updateOne({ id }, { text });
  }

  @ApiOperation({ summary: 'Изменить колонку у карточки' })
  @ApiQuery({ name: 'cardId', type: String, description: 'ID карточки' })
  @ApiQuery({ name: 'columnId', type: String, description: 'ID колонки' })
  @UseGuards(CardOwnerGuard)
  @Put('changeColumn')
  public async changeColumn(
    @Query() { cardId, columnId }: ChangeColumnQueryParams,
  ): Promise<Card> {
    return await this.cardsService.updateOne(
      { id: cardId },
      { column: { connect: { id: columnId } } },
    );
  }


  @ApiOperation({ summary: 'Изменить статус карточки' })
  @ApiQuery({ name: 'cardId', type: String, description: 'ID карточки' })
  @UseGuards(CardOwnerGuard)
  @Put('changeStatus/:cardId')
  public async changeStatus(
    @Body() { status }: ChangeStatusCardDto,
    @Query('cardId') cardId: string,
  ): Promise<Card> {
    return await this.cardsService.updateOne(
      { id: cardId },
      { status: status },
    );
  }
}
