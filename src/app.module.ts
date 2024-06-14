import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';


@Module({
  imports: [AuthModule, PrismaModule,ConfigModule.forRoot({isGlobal:true}), UsersModule, ColumnsModule, CardsModule, CommentsModule],
})
export class AppModule {}
