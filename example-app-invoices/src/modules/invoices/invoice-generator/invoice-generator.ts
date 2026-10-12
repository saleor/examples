import { OrderPayloadFragment } from "../../../../generated/graphql";
import { SellerAddress } from "../../app-configuration/address";

export interface InvoiceGenerator {
  generate(input: {
    order: OrderPayloadFragment;
    invoiceNumber: string;
    filename: string;
    companyAddressData: SellerAddress;
  }): Promise<void>;
}
