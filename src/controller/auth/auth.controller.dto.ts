import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginRequestDTO{
    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class LoginResponseDTO {
    @ApiProperty()
    access_token: string;
}