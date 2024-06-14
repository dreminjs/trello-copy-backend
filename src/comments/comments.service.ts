import { Body, Injectable } from '@nestjs/common';
import { Comment, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/user/currentUser.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreateCommentDto): Promise<Comment> {
    return await this.prisma.comment.create({
      data: { ...dto, userId: dto.userId },
    });
  }

  public async findMany(payload: Prisma.CommentWhereInput): Promise<Comment[]> {
    return await this.prisma.comment.findMany({ where: payload });
  }

  public async updateOne(
    whereOptions: Prisma.CommentWhereUniqueInput,
    data: Prisma.CommentUpdateInput,
  ): Promise<Comment> {
    return await this.prisma.comment.update({ where: whereOptions, data });
  }

  public async deleteOne(
    payload: Prisma.CommentWhereUniqueInput,
  ): Promise<void> {
    await this.prisma.comment.delete({ where: payload });
  }
}
