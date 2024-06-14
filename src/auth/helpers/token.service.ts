import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwt:JwtService,
        private readonly configService:ConfigService
    ){}

    public async generateToken(email:string) : Promise<string>{

        return this.jwt.signAsync(email, {
            secret: this.configService.get('JWT_SECRET'),
          });
      
    }

    public async decodeToken(token:string) : Promise<string> {
        return this.jwt.decode(token)
    }

    public async verifyToken(token:string) : Promise<any> {
       return this.jwt.verifyAsync(token)
    }


}