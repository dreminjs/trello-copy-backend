import { ApiProperty } from "@nestjs/swagger";


export class CreateCommentDto {
    @ApiProperty()
    cardId:string;
    @ApiProperty()
    text:string;
    @ApiProperty()
    userId?:string
}