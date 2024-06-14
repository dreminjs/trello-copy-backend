import { ApiProperty } from "@nestjs/swagger";
import { CardStatus } from "@prisma/client";

export class UpdateCardDto {
    @ApiProperty()
    text:string;
}

export class ChangeStatusCardDto {
    @ApiProperty()
    status?:CardStatus
}