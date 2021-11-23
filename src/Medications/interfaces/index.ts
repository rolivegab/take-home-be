export interface IDrugBankMedicationSearchResults {
  products: Array<IDrugBankMedicationSearchResult>;
}

export interface IDrugBankMedicationFilteredResult {
  ingredients?: Array<{ [key: string]: string }> | null;
  hits?: Array<{ [key: string]: string }> | null;
  name?: string;
}

export interface IDrugBankMedicationSearchResultItem {
  hits?: Array<{ [key: string]: string }> | null;
  name?: string;
  prescribable_name?: string;
  rx_norm_prescribable_name?: string;
  country?: string;
  ndc_product_codes?: Array<string> | null;
  dpd_codes?: Array<string> | null;
  ema_product_codes?: Array<string> | null;
  dosage_form?: string;
  strength?: {};
  route?: string;
  approved?: boolean;
  unapproved?: boolean;
  generic?: boolean;
  otc?: boolean;
  mixture?: boolean;
  allergen?: boolean;
  vaccine?: boolean;
  ingredients?: Array<{ [key: string]: string }> | null;
  images?: Array<string> | null;
}

export interface IDrugBankMedicationSearchResult {
  products?: Array<IDrugBankMedicationSearchResultItem> | null;
}

export interface IDrugBankInteractionIngredient {
  drugbank_id: string;
  name: string;
}

export interface IDrugBankInteraction {
  ingredient: IDrugBankInteractionIngredient;
  affected_ingredient: IDrugBankInteractionIngredient;
  description: string;
  extended_description: string;
  action: string;
  severity: string;
  subject_dosage: string | null;
  affected_dosage: string | null;
  evidence_level: string;
  management: string;
}

export interface IDrugBankInteractionsResult {
  interactions: Array<IDrugBankInteraction>;
  total_results: number;
}

export interface IMedicationSearchResult {
  idGroup: {
    name: string;
    rxnormId: Array<string>;
  };
}

export interface IDrugQuery {
  drugName: string;
}

export interface IMinConceptItem {
  rxcui: string;
  name: string;
  tty: string;
}

export interface ISourceConceptItem {
  id: string;
  name: string;
  url: string;
}

export interface IInteractionPairInstance {
  minConceptItem: IMinConceptItem;
  sourceConceptItem: ISourceConceptItem;
}

export interface IInteractionConcept {
  interactionConcept: [IInteractionPairInstance, IInteractionPairInstance];
  severity: string;
  description: string;
}

export interface IDrugInteractionSearchResult {
  comment: string;
  minConceptItem: IMinConceptItem;
  interactionPair: Array<IInteractionConcept>;
}

export interface IDrugInteractionBooleanResult {
  interactions: boolean;
}

export interface IUpdatedMedicationDetail {
  medicationDetailUpdated: boolean;
}
