
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class CreateColumnDto {
    @IsNotEmpty()
    @ApiProperty()
    title:string
}