import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './helpers/token.service';
import { JwtModule } from '@nestjs/jwt';
import {PasswordService} from "./helpers/password.service"
import { UsersModule } from "../user/users.module"
import { TokenStrategy } from './strategies/token.strategy';

@Module({
  imports:[JwtModule.register({}),UsersModule],
  controllers: [AuthController],
  providers: [AuthService,TokenService,PasswordService,TokenStrategy],
  exports:[TokenService,PasswordService,]
})
export class AuthModule {}
