import { Body, Controller, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { TokenService } from './helpers/token.service';
import { SingUpGuard } from './guards/signup.guard';
import { SingInGuard } from './guards/signin.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  private logger = new Logger(AuthController.name)

 
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @UseGuards(SingUpGuard)
  @Post('signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: any
  ): Promise<User> {
    
    const token = await this.tokenService.generateToken(dto.email);

    res.set('Authorization', `Bearer ${token}`);

    return await this.authService.signup(dto);
  }

  
  @ApiOperation({ summary: 'Вход' })
  @UseGuards(SingInGuard)
  @Post('signin')
  async signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res ): Promise<User> {

    const token = await this.tokenService.generateToken(dto.email);

    res.set('Authorization', `Bearer ${token}`);

    return await this.authService.signin(dto)
  }
}
