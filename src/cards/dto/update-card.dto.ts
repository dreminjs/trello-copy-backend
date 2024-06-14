import { ApiProperty } from "@nestjs/swagger";
import { CardStatus } from "@prisma/client";

export class UpdateCardDto {
    @ApiProperty()
    text:string;
    @ApiProperty()
    columnId:string;
    @ApiProperty()
    status?:CardStatus
}

export class ChangeStatusCardDto {
    @ApiProperty()
    status?:CardStatus
}