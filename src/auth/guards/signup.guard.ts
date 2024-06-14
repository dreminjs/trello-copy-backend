import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { UsersService } from '../../user/users.service';
  
  @Injectable()
  export class SingUpGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}
    async canActivate(context: ExecutionContext): Promise<any> {
      const request = context.switchToHttp().getRequest();
      const { email } = request.body; // Получаем пароль из req.body
  
      const candidate = await this.usersService.findOne({email})
  
      if (candidate) {
        throw new UnauthorizedException(
          "Такой пользователь с таким email'ом уже существует",
        );
      }
  
      return true;
    }
  }