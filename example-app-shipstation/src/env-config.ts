// Loads configuration from environment variables and throws an error if any of them is missing

// TODO: migrate to t3-env

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const rawCarrierCodes = process.env.CARRIER_CODES;
if (!rawCarrierCodes) {
  throw new Error(
    "CARRIER_CODES is not defined in the environment. It should contain list of available courier codes. Example: 'stamps_com,usps'"
  );
}
const CARRIER_CODES = rawCarrierCodes.split(",");

const FROM_POSTAL_CODE = process.env.FROM_POSTAL_CODE;
if (!FROM_POSTAL_CODE) {
  throw new Error(
    "FROM_POSTAL_CODE is not defined in the environment. It should contain the postal code of the sender"
  );
}

const SHIPSTATION_API_KEY = process.env.SHIPSTATION_API_KEY;
if (!SHIPSTATION_API_KEY) {
  throw new Error(
    "SHIPSTATION_API_KEY is not defined in the environment. It should contain the API key generated in the ShipStation dashboard"
  );
}

const SHIPSTATION_API_SECRET = process.env.SHIPSTATION_API_SECRET;
if (!SHIPSTATION_API_SECRET) {
  throw new Error(
    "SHIPSTATION_API_SECRET is not defined in the environment. It should contain the API secret generated in the ShipStation dashboard"
  );
}

export const ENV_CONFIG = {
  CARRIER_CODES,
  FROM_POSTAL_CODE,
  SHIPSTATION_API_KEY,
  SHIPSTATION_API_SECRET,
  LOG_LEVEL,
};
