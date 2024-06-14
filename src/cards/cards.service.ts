import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card, CardStatus, Prisma } from '@prisma/client';

@Injectable()
export class CardsService {
    constructor(
        private readonly prisma:PrismaService
    ){}

    public async create(dto:CreateCardDto) : Promise<Card> {
        return await this.prisma.card.create({
            data: {...dto,userId:dto.userId,status:"start"}
        })
    }

    public async updateOne(whereOptions:Prisma.CardWhereUniqueInput,data:Prisma.CardUpdateInput) : Promise<Card> {
        return await this.prisma.card.update({
            where: { ...whereOptions },
            data,
        })
    }

    public async findMany(payload:Prisma.CardWhereInput = {}) : Promise<Card[]> {
        return await this.prisma.card.findMany({ where : payload })
    }

    public async findOne(payload:Prisma.CardWhereInput = {}) : Promise<Card> {
        return await this.prisma.card.findFirst({ where: payload })
    }


}
 