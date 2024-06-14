import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { UsersService } from '../../user/users.service';
  import { SigninDto } from "../dto/signin.dto"
  import { PasswordService } from "../helpers/password.service"

  @Injectable()
  export class SingInGuard implements CanActivate {
    constructor(
        private readonly usersService: UsersService,
        private readonly passwordService: PasswordService

    ) {}

    private logger = new Logger(SingInGuard.name)

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { email,password } = request.body as SigninDto 
  
      const candidate = await this.usersService.findOne({email})
  
      if (!candidate) {
        throw new UnauthorizedException(
          "Такого пользователя не существует",
        );
      }

      this.logger.log(candidate)

      const hashpass = await this.passwordService.hashPassword(password,candidate.salt)

      const isPassCorrect = await this.passwordService.comparePassword(password,candidate.hashpass)

      this.logger.log(isPassCorrect)

      return isPassCorrect
    }
  }