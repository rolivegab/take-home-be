process.env.SENDGRID_API_KEY = "SG.mymockKey";

import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";
import { MedicationController } from "./medication.controller";
import { MedicationService } from "../services/medication.service";
import { Medication } from "../models/medication.model";

const medicationFactory = (fields) => {
  const medication: Partial<Medication> = { ...fields };
  return medication;
};

describe("MedicationController", () => {
  let testingModule: TestingModule;
  let controller: MedicationController;
  let spyService: MedicationService;

  const mockMedicationData = medicationFactory({
    id: "026ec4c9-2e80-47e1-97dc-1565f200ea15",
    brandName: "CymbaltaTM",
    slug: "cymbalta",
    genericname: "duloxetine",
    active: true,
    description: "",
    price: 99,
    specialConsiderations: "Suicide risk",
    category: "SNRI",
    usualRx: "60 mg QD",
    fdaIndications: "Anxiety, Depression",
    schedule: "Unscheduled",
    supply: "",
    dosages: "20 mg, 30 mg, 60 mg",
    createdAt: "2020-07-17T00:00:00.000Z",
    updatedAt: "2020-07-17T00:00:00.000Z",
  });

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [MedicationController],
      providers: [
        {
          provide: MedicationService,
          useFactory: () => ({
            getByIdAndActive: jest.fn().mockReturnValue(mockMedicationData),
            getAllActiveWithFilter: jest
              .fn()
              .mockReturnValue([mockMedicationData]),
            searchDrugBank: jest.fn(),
            getDrugInteractionsDrugBank: jest.fn(),
            getFilters: jest.fn(),
          }),
        },
      ],
    }).compile();
    controller = testingModule.get(MedicationController);
    spyService = testingModule.get(MedicationService);
  });

  it("should call to findAll service method", async () => {
    await controller.findAll();
    expect(spyService.getAllActiveWithFilter).toHaveBeenCalled();
  });

  it("should call to findAll service method filtering by zip code", async () => {
    await controller.findAll({ zipCode: "10001" });
    expect(spyService.getAllActiveWithFilter).toHaveBeenCalled();
  });

  it("should call to findOne service method", async () => {
    await controller.findOne("123");
    expect(spyService.getByIdAndActive).toHaveBeenCalled();
  });

  it("should call the drug search service method", async () => {
    await controller.search({ drugName: "lipitor" });
    expect(spyService.searchDrugBank).toHaveBeenCalled();
  });
});
