import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { PrismaModule } from "../prisma/prisma.module"
import { UsersModule } from 'src/user/users.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [PrismaModule,UsersModule,AuthModule],
  controllers: [ColumnsController],
  providers: [ColumnsService]
})
export class ColumnsModule {}
