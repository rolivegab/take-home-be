import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MedicationDetailDto {
  @ApiProperty({
    example: "some use",
    description: "medication uses",
    required: false,
  })
  @IsOptional()
  uses: string;

  @ApiProperty({
    example: "side effect b",
    description: "side effects",
    required: false,
  })
  @IsOptional()
  sideEffects: string;

  @ApiProperty({
    example: "precaution a",
    description: "precautions",
    required: false,
  })
  @IsOptional()
  precautions: string;

  @ApiProperty({
    example: "interaction a, interaction b",
    description: "interactions",
    required: false,
  })
  @IsOptional()
  interactions: string;
}
