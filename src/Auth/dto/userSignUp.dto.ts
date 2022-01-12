import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[#¿?¡!@$%^&/()=+{}[\]:;."'`,*\-_<>¬]).{8,}$/;

export class UserSignUpDto {
  @ApiProperty({
    example: "rolivegab",
    description: "Username, must be unique",
  })
  username!: string;

  @ApiProperty({
    example: "Password!123",
    description: "User password",
  })
  @IsNotEmpty()
  @Matches(passwordRegex)
  password!: string;

  @ApiProperty({
    example: '10001',
    description: "User zip code"
  })
  zipCode!: string;
}
