import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class SigninDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string

}