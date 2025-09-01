import { describe, expect, it } from "vitest";
import { saleorToShipstation } from "./saleor-to-shipstation";
import { CheckoutLineFragment, WeightUnitsEnum } from "../../../generated/graphql";
import { PackageType, WeightUnits } from "./types";

const dummyLineWithSizeAttribute = (size: PackageType): CheckoutLineFragment => ({
  id: "dummy",
  variant: {
    weight: {
      unit: WeightUnitsEnum.G,
      value: 1,
    },
    product: {
      packageSize: {
        values: [
          {
            slug: size,
          },
        ],
      },
    },
  },
});

describe("saleorToShipstation", () => {
  describe("mapSaleorLinesToWeight", () => {
    it("should map Saleor g lines to weight in grams", () => {
      const lines: CheckoutLineFragment[] = [
        {
          id: "1",
          variant: {
            weight: {
              unit: WeightUnitsEnum.G,
              value: 1,
            },
            product: {
              packageSize: {
                values: [
                  {
                    slug: "small",
                  },
                ],
              },
            },
          },
        },
      ];

      const result = saleorToShipstation.mapSaleorLinesToWeight(lines);

      expect(result).toEqual({
        value: 1,
        units: WeightUnits.Grams,
      });
    });
    it("should map Saleor kg lines to weight in grams", () => {
      const lines: CheckoutLineFragment[] = [
        {
          id: "1",
          variant: {
            weight: {
              unit: WeightUnitsEnum.Kg,
              value: 1,
            },
            product: {
              packageSize: {
                values: [
                  {
                    slug: "small",
                  },
                ],
              },
            },
          },
        },
      ];

      const result = saleorToShipstation.mapSaleorLinesToWeight(lines);

      expect(result).toEqual({
        value: 1000,
        units: WeightUnits.Grams,
      });
    });
    it("should map Saleor lines with no variant.weight to zero weight", () => {
      const lines: CheckoutLineFragment[] = [
        {
          id: "1",
          variant: {
            product: {
              packageSize: {
                values: [
                  {
                    slug: "small",
                  },
                ],
              },
            },
          },
        },
      ];

      const result = saleorToShipstation.mapSaleorLinesToWeight(lines);

      expect(result).toEqual({
        value: 0,
        units: WeightUnits.Grams,
      });
    });
    it("should throw an error if the weight unit is not supported", () => {
      const lines: CheckoutLineFragment[] = [
        {
          id: "1",
          variant: {
            weight: {
              unit: WeightUnitsEnum.Tonne,
              value: 1,
            },
            product: {
              packageSize: {
                values: [
                  {
                    slug: "small",
                  },
                ],
              },
            },
          },
        },
      ];

      expect(() => saleorToShipstation.mapSaleorLinesToWeight(lines)).toThrowError(
        "TONNE is not a supported weight unit"
      );
    });
  });
  describe("summaryCheckoutLinesPackageTypes", () => {
    it("should return zeros when no lines are provided", () => {
      const lines: CheckoutLineFragment[] = [];

      const result = saleorToShipstation.summaryCheckoutLinesPackageTypes(lines);

      expect(result).toEqual({
        envelope: 0,
        smallBox: 0,
        largeBox: 0,
      });
    });

    it("should treat item types as envelopes when no package attributes were assigned", () => {
      const lines: CheckoutLineFragment[] = [
        {
          id: "1",
          variant: {
            weight: {
              unit: WeightUnitsEnum.G,
              value: 1,
            },
            product: {
              packageSize: {
                values: [],
              },
            },
          },
        },
        {
          id: "2",
          variant: {
            weight: {
              unit: WeightUnitsEnum.G,
              value: 1,
            },
            product: {
              packageSize: {
                values: [],
              },
            },
          },
        },
      ];

      const result = saleorToShipstation.summaryCheckoutLinesPackageTypes(lines);

      expect(result).toEqual({
        envelope: 2,
        smallBox: 0,
        largeBox: 0,
      });
    });
    it("should return one envelope, two small, 4 large boxes", () => {
      const lines: CheckoutLineFragment[] = [
        dummyLineWithSizeAttribute("envelope"),
        dummyLineWithSizeAttribute("smallBox"),
        dummyLineWithSizeAttribute("smallBox"),
        dummyLineWithSizeAttribute("largeBox"),
        dummyLineWithSizeAttribute("largeBox"),
        dummyLineWithSizeAttribute("largeBox"),
        dummyLineWithSizeAttribute("largeBox"),
      ];

      const result = saleorToShipstation.summaryCheckoutLinesPackageTypes(lines);

      expect(result).toEqual({
        envelope: 1,
        smallBox: 2,
        largeBox: 4,
      });
    });
  });
  describe("mapSaleorLinesToPackageDimensions", () => {
    it("return envelope dimensions", () => {
      const lines: CheckoutLineFragment[] = [dummyLineWithSizeAttribute("envelope")];

      const result = saleorToShipstation.mapSaleorLinesToPackageDimensions(lines);

      expect(result).toEqual({
        height: 1,
        length: 30,
        width: 20,
        units: "centimeters",
      });
    });
  });
});
