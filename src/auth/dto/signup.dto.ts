import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class SignupDto {

    @ApiProperty({ description: 'электронная почта'})
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({ description: 'имя пользователя' })
    @IsNotEmpty()
    @IsString()
    username:string
    
    @ApiProperty({ description: 'Пароль' })
    @IsNotEmpty()
    @IsString()
    password:string

}