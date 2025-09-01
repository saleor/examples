import { GetRatesResponse } from "./api/get-rates";
import { SaleorShippingMethod } from "../../lib/types";

const mapShipstationRates = (rates: GetRatesResponse): SaleorShippingMethod[] => {
  return rates.map((rate) => {
    return {
      id: rate.serviceCode,
      name: rate.serviceName,
      amount: rate.shipmentCost + rate.otherCost,
      currency: "USD",
    };
  });
};

export const shipstationToSaleor = {
  mapShipstationRates,
};
