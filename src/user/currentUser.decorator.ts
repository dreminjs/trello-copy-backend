import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenService } from "../auth/helpers/token.service"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from "./users.service"
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) : Promise<User | null> => {
    const request = ctx.switchToHttp().getRequest() as Request
    const token = request.headers["Authorization"].split(" ")[1]

    const jwtService = new JwtService()

    const configService = new ConfigService()

    const tokenService = new TokenService(jwtService,configService)

    const prisma = new PrismaService()

    const userService = new UsersService(prisma)

    const email = await tokenService.decodeToken(token)

    const user = await userService.findOne({email})

    return user;
  },
);