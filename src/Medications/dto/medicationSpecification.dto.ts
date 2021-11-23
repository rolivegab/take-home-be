import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { MedicationFormat } from "../entities";

export class MedicationSpecificationDto {
  @ApiProperty({
    example: true,
    description: "Format specification, one of `Capsule` or `Tablet`",
  })
  @IsNotEmpty()
  @IsEnum(MedicationFormat)
  format: MedicationFormat;

  @ApiProperty({
    example: true,
    description: "Dosage specification, total `mg` for dose",
  })
  @IsNotEmpty()
  dosage: number;

  @ApiProperty({
    example: "57237017601",
    description: "National Drug Code",
  })
  ndc?: string;

  @ApiProperty({
    example: true,
    description: "Enabled if specification is available in the listings",
  })
  @IsNotEmpty()
  active: boolean;
}
