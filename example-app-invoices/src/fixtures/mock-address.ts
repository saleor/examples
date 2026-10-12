import { SellerAddress } from "../modules/app-configuration/address";

export const getMockAddress = (): SellerAddress => {
  return {
    city: "Wrocław",
    cityArea: "",
    companyName: "Saleor",
    country: "Poland",
    countryArea: "Dolnoslaskie",
    postalCode: "12-123",
    streetAddress1: "Techowa 7",
    streetAddress2: "",
  };
};
