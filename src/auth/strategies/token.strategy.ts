import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/user/users.service';
import { User } from '@prisma/client';

@Injectable()
export class TokenStrategy extends PassportStrategy(
  Strategy,
  'TokenStrategy',
) {
  private logger = new Logger(TokenStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: string) : Promise<User> {
    return await this.usersService.findOne({email:payload})
  }
}