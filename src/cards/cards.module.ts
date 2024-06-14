import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/user/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[PrismaModule,UsersModule,AuthModule],
  controllers: [CardsController],
  providers: [CardsService]
})
export class CardsModule {}
