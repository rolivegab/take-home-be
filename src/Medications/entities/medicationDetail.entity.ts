import { MedicationDetail } from "../models/medicationDetail.model";

export class MedicationDetailEntity {
  id: string;
  genericName: string;
  uses: string;
  sideEffects: string;
  precautions: string;
  interactions: string;
  medicationId: string;

  constructor(medicationDetail: MedicationDetail) {
    this.id = medicationDetail.id;
    this.uses = medicationDetail.uses;
    this.sideEffects = medicationDetail.sideEffects;
    this.precautions = medicationDetail.precautions;
    this.interactions = medicationDetail.interactions;
    this.medicationId = medicationDetail.medicationId;
  }
}
