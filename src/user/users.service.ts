import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(payload: Prisma.UserWhereInput = {}): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: payload });
  }

  public async deleteOne(payload: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prisma.user.delete({ where: payload });
  }

  public async updateOne(
    whereOptions: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.prisma.user.update({ where: whereOptions, data });
  }

  public async createOne(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
}
