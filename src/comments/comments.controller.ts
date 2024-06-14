import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, User } from '@prisma/client';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { CommentsService } from './comments.service';
import { Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenJwtGuard } from 'src/auth/guards/token.guard';

@ApiTags("comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}



  @ApiOperation({summary:"Создание комментария"})
  @UseGuards(TokenJwtGuard)
  @Post()
  public async create(
    @Body() dto: CreateCommentDto,
    @CurrentUser() { id: userId }: User,
  ): Promise<Comment> {
    return await this.commentService.create({ ...dto, userId });
  }


  @ApiOperation({summary:"Удаление комментария"})
  @UseGuards(TokenJwtGuard)
  @Delete(':commentId')
  public async delete(@Param('commentId') commentId: string): Promise<void> {
    await this.commentService.deleteOne({ id: commentId });
  }

  @ApiOperation({summary:"Получение комментария определенной карточки"})
  @UseGuards(TokenJwtGuard)
  @Get(':cardId')
  public async findMany(@Param('cardId') cardId: string): Promise<Comment[]> {
    return await this.commentService.findMany({ cardId });
  }

  @ApiOperation({summary:"Редактирование комментария"})
  @UseGuards(TokenJwtGuard)
  @Put(':commentId')
  public async updateOne(
    @Body() dto: UpdateCommentDto,
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return await this.commentService.updateOne({ id: commentId, }, { ...dto });
  }
}
