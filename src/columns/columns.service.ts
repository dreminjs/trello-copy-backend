import { Injectable } from '@nestjs/common';
import { Column, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnsService {

    constructor(private readonly prisma:PrismaService){}

    public async findOne(paylaod:Prisma.ColumnWhereInput) : Promise<Column> {
        return await this.prisma.column.findFirst({where:paylaod})
    }

    public async findMany(paylaod:Prisma.ColumnWhereInput) : Promise<Column[]> {
        return await this.prisma.column.findMany({where:paylaod})
    }

    public async create(title:string,userId:string): Promise<Column> {
        return await this.prisma.column.create({data:{title,userId}})
    }

    public async deleteOne(paylaod: Prisma.ColumnWhereUniqueInput) : Promise<void> {
        await this.prisma.column.delete({where:paylaod})
    }

    public async updateOne(whereOptions:Prisma.ColumnWhereUniqueInput,data:Prisma.ColumnUpdateInput ) : Promise<Column> {
        return await this.prisma.column.update({
            data,
            where: whereOptions
        })
    }

}
