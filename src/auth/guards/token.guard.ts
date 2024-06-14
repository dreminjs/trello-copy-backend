import { AuthGuard } from '@nestjs/passport';

export class TokenJwtGuard extends AuthGuard('TokenStrategy') {}