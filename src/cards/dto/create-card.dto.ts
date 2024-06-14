

import { ApiProperty } from "@nestjs/swagger";
import { Min,IsNotEmpty,Max } from "class-validator"

export class CreateCardDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(2,{message:"миманльно 2 символа"})
    @Max(100,{message:"максимально два символа"})
    text:string;
    @ApiProperty()
    @IsNotEmpty()
    columnId:string;
   
    userId?:string

}