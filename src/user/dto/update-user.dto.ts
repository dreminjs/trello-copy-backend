import { ApiProperty } from "@nestjs/swagger";




export class UpdateUserDto {
    @ApiProperty()
    username:string;
}