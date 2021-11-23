import { MedicationSpecification } from "../models/medicationSpecification.model";
import {
  AVAILABLE_FORMATS,
  DOSAGE_MULTIPLIER,
  MedicationFormat,
} from "./medication.entity";

export class MedicationSpecificationEntity {
  ndc: string;
  format: MedicationFormat;

  /**
   * Before saving this value to the DB we multiply by `1000`
   */
  dosage: number;

  /**
   * Suffix represents the measure system for dosages, ex: `mg`.
   */
  dosageSuffix: string;

  constructor(medicationSpecification: MedicationSpecification) {
    this.ndc = medicationSpecification.ndc;
    this.format = medicationSpecification.format;
    this.dosage = medicationSpecification.dosage / DOSAGE_MULTIPLIER;
    this.dosageSuffix = AVAILABLE_FORMATS[this.format].suffix;
  }

  getFormatLabel() {
    return AVAILABLE_FORMATS[this.format].singular;
  }

  getDosageLabel() {
    return `${this.dosage} ${this.dosageSuffix}`;
  }

  /**
   * Converts NDCs from 10-digits to 11 digits.
   *
   * Payers are requiring an 11-digit NDC code for billing purposes. Therefore, proper billing may
   * require a specially-placed zero to create a 5-4-2 format depending upon the drug product’s
   * 10-digit NDC.
   *
   * It should be noted that many National Drug Code (NDC) are displayed on drug packing
   * in a 10-digit format. Proper billing of a National Drug Code (NDC) requires an 11-digit
   * number in a 5-4-2 format. Converting National Drug Code (NDC) from a 10-digit to an
   * 11-digit format requires a strategically placed zero, dependent upon the 10-digit format.
   * The following table shows common 10-digit National Drug Code (NDC) formats
   * indicated on packaging and the associated conversion to an 11-digit format, using the
   * proper placement of a zero. The correctly formatted, additional “0” is in a bold font and
   * underlined in the following example. Note that hyphens indicated below are used solely
   * to illustrate the various formatting examples for the National Drug Code (NDC).
   *
   * | 10-Digit Format | Converted 11-Digit Format |
   * | --------------- | ------------------------- |
   * | 4-4-2           | 5-4-2                     |
   * | 5-3-2           | 5-4-2                     |
   * | 5-4-1           | 5-4-2                     |
   */
  static formatNDC(originalNDC: string) {
    if (!originalNDC) {
      return null;
    }

    let ndc11 = originalNDC.trim();

    // If the string is formatted with hyphens, the break it up to format properly
    if (/[-]/.test(originalNDC)) {
      const [labeler, productCode, packageCode] = originalNDC.split("-");
      ndc11 =
        String(labeler).padStart(5, "0") +
        String(productCode).padStart(4, "0") +
        String(packageCode).padStart(2, "0");
    }

    if (ndc11.length !== 11) {
      throw new Error(`NDC11 is invalid. Value returned ${ndc11}`);
    }

    return ndc11;
  }
}
