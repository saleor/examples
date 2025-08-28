export enum WeightUnits {
  Pounds = "pounds",
  Ounces = "ounces",
  Grams = "grams",
}

export interface Weight {
  value: number;
  units: WeightUnits;
}

export interface Dimensions {
  units: "inches" | "centimeters";
  length: number;
  width: number;
  height: number;
}

export interface Dimensions {
  units: "inches" | "centimeters";
  length: number;
  width: number;
  height: number;
}

export type PackageType = "envelope" | "smallBox" | "largeBox";

export type PackageTypeSummary = Record<PackageType, number>;

export const PackageDimensionsMap: Record<PackageType, Dimensions> = {
  envelope: { units: "centimeters", length: 30, width: 20, height: 1 },
  smallBox: { units: "centimeters", length: 30, width: 30, height: 30 },
  largeBox: { units: "centimeters", length: 50, width: 50, height: 50 },
};
