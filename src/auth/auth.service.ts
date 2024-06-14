import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PasswordService } from './helpers/password.service';
import { UsersService } from 'src/user/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
  ) {}

  async signup(dto: SignupDto): Promise<User> {
    const salt = await bcrypt.genSalt();

    const hashpass = await this.passwordService.hashPassword(
      dto.password,
      salt,
    );

    return await this.userService.createOne({
      username:dto.username,
      email:dto.email,
      salt: salt,
      hashpass,
    });
  }

  async signin(dto: SigninDto): Promise<User> {
    return await this.userService.findOne({ email: dto.email });
  }
}
