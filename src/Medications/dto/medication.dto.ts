import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayUnique,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import {
  MedicationCategory,
  MedicationFrequencies,
  MedicationSchedules,
} from "../entities";
import { MedicationDetailDto } from "./medicationDetail.dto";
import { MedicationSpecificationDto } from "./medicationSpecification.dto";

export class MedicationDto {
  @ApiProperty({
    example: "Lunesta™",
    description: "Medication brand name",
  })
  @IsNotEmpty()
  brandName: string;

  @ApiProperty({ example: "description", description: "description" })
  description: string;

  @ApiProperty({ example: 4.99, description: "price" })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  price: number;

  @ApiProperty({
    example: "NON_CONTROLLED",
    description: "Medication subcategory",
  })
  @IsNotEmpty()
  @IsEnum(MedicationCategory)
  subCategory: MedicationCategory;

  @ApiProperty({
    example: "Anxiety, Depression",
    description: "fdaIndications",
  })
  fdaIndications: string;

  @ApiProperty({
    example: "Unscheduled",
    description: "Medication schedule type",
  })
  @IsEnum(MedicationSchedules)
  csaSchedule: MedicationSchedules;

  @ApiProperty({ example: 90, description: "Days of supply" })
  @IsNumber()
  supply: number;

  @ApiProperty({
    example: ["As needed", "Daily"],
    description: "Specification frequencies",
  })
  @IsNotEmpty()
  @ArrayUnique()
  @IsEnum(MedicationFrequencies, { each: true })
  frequencies: MedicationFrequencies[];

  @ApiProperty({
    example: "DB00285",
    description: "Drug Bank medication Id used for check interactions",
  })
  @IsNotEmpty()
  drugBankId: string;

  @ApiProperty({ example: true, description: "boolean: true/false" })
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({
    example: {
      uses: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sideEffects: "Donec vitae dui ut nulla ullamcorper dapibus.",
      precautions: "Etiam posuere sodales semper.",
    },
    description: "details",
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MedicationDetailDto)
  details?: MedicationDetailDto;

  @ApiProperty({
    description: "Medication specifications",
    type: [MedicationSpecificationDto],
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MedicationSpecificationDto)
  specifications?: MedicationSpecificationDto[];
}
