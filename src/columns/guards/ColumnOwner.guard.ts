import {
    BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../user/users.service';
import { TokenService } from '../../auth/helpers/token.service';
import { ColumnsService } from '../columns.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly columnService: ColumnsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id: columnId } = request.params;

    const column = await this.columnService.findOne({ id : columnId })

    const token = request.headers['Authorization'].split(' ')[1];

    const isTokenValidate = await this.tokenService.verifyToken(token)

    if(!isTokenValidate) throw new UnauthorizedException("Нет прав!")

    const email = await this.tokenService.decodeToken(token)

    const candidate = await this.usersService.findOne({ email });

    if (candidate) {
      throw new UnauthorizedException('Такого пользователя не существует');
    }

    if(candidate!.id !== column.userId ){
        throw new BadRequestException("Нет прав!")
    }
    return true;
  }
}
