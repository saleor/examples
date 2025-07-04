import type { ValidateFunction } from "ajv";
import type { JSONObject } from '../../types';
/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface TransactionChargeRequestedResponse {
  pspReference: string;
  result?: "CHARGE_SUCCESS" | "CHARGE_FAILURE";
  amount?: number;
  time?: string;
  externalUrl?: string;
  message?: string;
}

declare const ValidateTransactionChargeRequestedResponse: ValidateFunction<TransactionChargeRequestedResponse>;
export default ValidateTransactionChargeRequestedResponse;