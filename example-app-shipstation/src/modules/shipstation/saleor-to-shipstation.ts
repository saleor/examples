import { CheckoutLineFragment, WeightUnitsEnum } from "../../../generated/graphql";
import { createLogger } from "../../lib/logger";
import { notEmpty } from "../../lib/not-empty";
import {
  Dimensions,
  PackageDimensionsMap,
  PackageType,
  PackageTypeSummary,
  Weight,
  WeightUnits,
} from "./types";

const logger = createLogger("saleorToShipstation");

/**
 * The function takes a list of Saleor weights and sums them up. Output follows Shipstation weight format.
 *
 * Assumptions made:
 * - If no weights are found, it returns 0 grams
 * - If the unit is KG, it converts it to grams
 * - If the unit is not supported, it throws an error
 * - All of the provided weights are in the same unit
 */
const mapSaleorLinesToWeight = (lines: CheckoutLineFragment[]): Weight => {
  const weights = lines.map((line) => line.variant.weight).filter(notEmpty);

  if (weights.length === 0) {
    // TODO: should we throw an error here?
    logger.trace("No weights found, returning 0 grams");

    return {
      value: 0,
      units: WeightUnits.Grams,
    };
  }

  let unit = weights[0].unit;
  let value = weights.reduce((acc, weight) => {
    return acc + weight.value;
  }, 0);

  // Weight conversion, ShipStation does not support KGs
  if (unit === "KG") {
    value = value * 1000;
    unit = WeightUnitsEnum.G;
  }

  // TODO: shouldn't we convert TONNE to KG?
  const weightMap: Record<WeightUnitsEnum, WeightUnits | undefined> = {
    G: WeightUnits.Grams,
    KG: undefined,
    LB: WeightUnits.Pounds,
    OZ: WeightUnits.Ounces,
    TONNE: undefined,
  };

  const convertedUnit = weightMap[unit];

  if (convertedUnit === undefined) {
    throw new Error(`${unit} is not a supported weight unit`);
  }

  return {
    value: value,
    units: convertedUnit,
  };
};

// Count the number of each package type in the checkout lines. The size is based on product attribute with slug `package-size`
// If no package size is found, it defaults to envelope
export const summaryCheckoutLinesPackageTypes = (
  lines: CheckoutLineFragment[]
): PackageTypeSummary => {
  const packageTypesCounter: PackageTypeSummary = {
    envelope: 0,
    smallBox: 0,
    largeBox: 0,
  };

  lines.forEach((line) => {
    const packageSize = line.variant.product?.packageSize?.values[0]?.slug;

    switch (packageSize) {
      case "smallBox":
        packageTypesCounter.smallBox++;
        break;
      case "largeBox":
        packageTypesCounter.largeBox++;
        break;
      default:
        packageTypesCounter.envelope++;
        break;
    }
  });

  return packageTypesCounter;
};

// Operates on assumption, that each box size can contain certain amount of the smaller box sizes
// If arbitrary limits are exceeded, bigger box type will be chosen
export const choosePackageType = (packageTypes: PackageTypeSummary): PackageType => {
  if (packageTypes.envelope <= 5 && packageTypes.smallBox === 0 && packageTypes.largeBox === 0) {
    return "envelope";
  }

  if (packageTypes.envelope <= 20 && packageTypes.smallBox <= 5 && packageTypes.largeBox === 0) {
    return "smallBox";
  }

  return "largeBox";
};

export const mapSaleorLinesToPackageDimensions = (lines: CheckoutLineFragment[]): Dimensions => {
  const summary = summaryCheckoutLinesPackageTypes(lines);
  const packageType = choosePackageType(summary);

  return PackageDimensionsMap[packageType];
};

export const saleorToShipstation = {
  mapSaleorLinesToWeight,
  summaryCheckoutLinesPackageTypes,
  choosePackageType,
  mapSaleorLinesToPackageDimensions,
};
