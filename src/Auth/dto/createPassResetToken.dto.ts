import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateResetPassDto {
  @ApiProperty({
    example: "some@email.com",
    description: "User email",
  })
  @IsEmail()
  email: string;
}
