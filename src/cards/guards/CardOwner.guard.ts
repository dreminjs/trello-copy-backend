import {
    BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../user/users.service';
import { TokenService } from '../../auth/helpers/token.service';
import { CardsService } from '../cards.service';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly cardService: CardsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id: cardId } = request.params;

    const column = await this.cardService.findOne({ id : cardId })

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
