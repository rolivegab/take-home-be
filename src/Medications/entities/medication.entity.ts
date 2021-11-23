import { Medication } from "../models/medication.model";
import { MedicationDetailEntity } from "./medicationDetail.entity";
import { MedicationSpecificationEntity } from "./medicationSpecification.entity";

export const SUPPLY_DAYS_90 = 90;
export const SUPPLY_DAYS_30 = 30;
export const DOSAGE_MULTIPLIER = 1000;
export const DEFAULT_MEDICATION_PRICE = 5.0;

export enum MedicationFormat {
  CAPSULE = "CAPSULE",
  TABLET = "TABLET",
}

export enum MedicationCategory {
  CONTROLLED = "CONTROLLED",
  NON_CONTROLLED = "NON_CONTROLLED",
}

export enum MedicationSchedules {
  UNSCHEDULED = "Unscheduled",
  SCHEDULEI = "Schedule I",
  SCHEDULEII = "Schedule II",
  SCHEDULEIII = "Schedule III",
  SCHEDULEIV = "Schedule IV",
  SCHEDULEV = "Schedule V",
}

export enum MedicationFrequencies {
  AS_NEEDED = "As needed",
  AT_BEDTIME = "At bedtime",
  AT_BEDTIME_AS_NEEDED = "At bedtime as needed",
  DAILY = "Daily",
  DAILY_AT_BEDTIME = "Daily at bedtime",
  ONCE_DAILY = "Once daily",
  TWICE_DAILY = "Twice daily",
  THREE_TIMES_DAILY = "Three times daily",
  OTHER = "Other",
}

export const AVAILABLE_FORMATS = {
  CAPSULE: {
    singular: "Capsule",
    plural: "Capsules",
    suffix: "mg",
  },
  TABLET: {
    singular: "Tablet",
    plural: "Tablets",
    suffix: "mg",
  },
};

const splitTrim = (list: string) =>
  list?.split(",")?.map((i: string) => i?.trim());

export class MedicationEntity {
  id: string;
  brandName: string;
  genericName: string;
  description: string;
  price: number;
  specialConsiderations: string;
  category: string;
  schedule: string;
  supply: number;
  usualRx: string;
  subCategory: MedicationCategory;
  visitRequired: boolean;
  frequencies: string[];

  specifications: MedicationSpecificationEntity[] = [];
  details: MedicationDetailEntity;

  /**
   * @deprecated
   */
  dosages: string[];

  /**
   * @deprecated
   */
  slug: string;

  /**
   * @deprecated
   */
  format: MedicationFormat;

  /**
   * @deprecated
   */
  comingSoon: boolean;

  constructor(medication: Medication) {
    this.id = medication.id;
    this.brandName = medication.brandName;
    this.genericName = medication.genericName;
    this.description = medication.description;
    this.price = medication.price;
    this.specialConsiderations = medication.specialConsiderations;
    this.category = medication.category;
    this.usualRx = medication.usualRx;
    this.schedule = medication.schedule;
    this.supply = medication.supply;
    this.subCategory = medication.subCategory;
    this.visitRequired = medication.visitRequired;

    // TODO: Using the new frequencies column depends on Specifications rolled out.
    this.frequencies =
      medication?.specifications?.length > 0
        ? splitTrim(medication.frequencies)
        : splitTrim(medication.frequency);

    // TODO: Deprecated values to be removed
    this.slug = medication.slug;
    this.format = medication.format as MedicationFormat;
    this.comingSoon = medication.comingSoon;
    this.dosages = splitTrim(medication.dosages);

    if (medication?.details) {
      this.details = new MedicationDetailEntity(medication.details);
    }

    if (medication?.specifications) {
      this.specifications = medication.specifications.map(
        (spec) => new MedicationSpecificationEntity(spec)
      );
    }
  }
}
